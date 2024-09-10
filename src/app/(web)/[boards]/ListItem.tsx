'use client'
import { Post } from '@/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ListItem({ item, params }: { item: Post; params: { boards: string } }) {
  const route = useRouter();
  const { data:session, status } =  useSession();

  console.log("타입확인::",session?.user?.type)
  console.log("게시판확인::",params.boards)

  const handleDetailView = (e:React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
      if (session?.user?.type !== 'admin' && params.boards === 'info') {
        alert("관리자 권한이 필요합니다")
      } else {
        route.push(`/${item.type}/${item._id}`)
      }
    
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-slate-100 transition duration-300 ease-in-out">
      {/* <td className="p-2 text-center">{item._id}</td> */}
      <td className="p-2 truncate indent-4">
        <Link href="#" onClick={e => handleDetailView(e)} className="cursor-pointer">
          {item.title}
          {params.boards === 'info' ? ' 차량 시승 신청 합니다.' : ''}
        </Link>
      </td>
      {/* <td className="p-2 text-center truncate">{item.user.name}</td> */}
      <td className="p-2 text-center truncate">{item.extra?.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.repliesCount}</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {item.updatedAt.slice(0, 10)}
      </td>
    </tr>
  );
}

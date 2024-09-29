'use client'
import { useSession } from '@/hook/session';
import { Post } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ListItem({ item, params }: { item: Post; params: { boards: string } }) {
  const route = useRouter();
  const session = useSession();
  const handleDetailView = (e:React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
      if (session?.user?.type !== 'admin' && params.boards === 'drive') {
        alert("관리자 권한이 필요합니다.")
      } else {
        route.push(`/${item.type}/${item._id}`)
      }
    
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-slate-100 transition duration-300 ease-in-out">
      {/* <td className="p-2 text-center">{item._id}</td> */}
      <td className="p-2 indent-4 max-[1366px]:break-keep max-[1366px]:indent-0 max-[1366px]:pl-[5%] max-[1366px]:pr-[3%]">
        <Link href="#" onClick={e => handleDetailView(e)} className="cursor-pointer">
          {item.title}
        </Link>
      </td>
      {/* <td className="p-2 text-center truncate">{item.user.name}</td> */}
      <td className="p-2 text-center truncate max-[1366px]:pl-0 max-[1366px]:pr-[5%] max-[1366px]:text-left">{item.extra?.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.repliesCount}</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {item.updatedAt.slice(0, 10)}
      </td>
    </tr>
  );
}

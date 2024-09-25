'use client';

import Submit from '@/components/Submit';
import { deleteComment } from '@/data/actions/postAction';
import { PostComment } from '@/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
const CLIENT = process.env.NEXT_CLIENT_ID;
const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

// deletePost
export default function CommentItem({
  postId,
  item,
  authorId,
  boardName
}: {
  postId: string,
  item: PostComment,
  authorId: number,
  boardName: string
}) {
  const session = useSession();
  const userId = session.data?.user?.id;
  const userType = session.data?.user?.type;

  const image = item.user.image ? SERVER + item.user?.image : `${SERVER}/files/${CLIENT}/user-jayg.webp`;

  return (
    <div className="border-b-[1px] border-gray-400 border-solid p-2 mb-4">
      <div className="flex gap-2 justify-between items-center mb-2">
        <figure className='relative w-[32px] h-[32px] aspect-auto'>
          <Image fill sizes='100%' src={image} alt="프로필 이미지" />
        </figure>
        <Link href="" className="font-medium text-lg">
          {item.user?.name}
        </Link>
        <time 
          className="ml-auto text-[#aaa] text-sm" 
          dateTime={item.updatedAt}
          style={{ fontFamily: 'Hyundai-sans' }}
        >
          {item.updatedAt}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <form 
          action={deleteComment}
          className='w-full' 
        >
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="commentId" value={item._id} />
          <input type="hidden" name="boardName" value={boardName} />
          <pre
            className="whitespace-pre-wrap font-light ml-2 mb-4"
            style={{ fontFamily: 'Pretendard' }}
          >
            {item.content}
          </pre>
          {(userType === 'admin' || String(authorId) === userId) ? (
            <div className='flex flex-row-reverse'>
              <Submit 
                bgColor="black"
                size="medium">
                삭제
              </Submit>
            </div>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
}

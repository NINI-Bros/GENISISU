'use client';

import Submit from '@/components/Submit';
import { deleteComment } from '@/data/actions/postAction';
import { PostComment } from '@/types';
import Link from 'next/link';
const CLIENT = process.env.NEXT_CLIENT_ID;
const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

// deletePost
export default function CommentItem({
  postId,
  item,
  boardName,
}: {
  postId: string;
  item: PostComment;
  boardName: string;
}) {
  let image = `${SERVER}/${item.user?.image}`;
  if (!item.user?.image) {
    image = `${SERVER}/files/${CLIENT}/user-jayg.webp`;
  }

  // const clickhandler = async () => {
  //   const postId = '1';
  //   const formData = '4';

  //   const res = await deleteComment(postId, formData);

  //   console.log(res);
  // };

  return (
    <div className="border-b-[1px] border-gray-400 border-solid p-2 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img className="w-8 h-4 mr-2" src={image} alt="프로필 이미지" />
        <Link href="" className="font-medium text-lg">
          {item.user?.name}
        </Link>
        <time className="ml-auto text-gray-400" dateTime={item.updatedAt}>
          {item.updatedAt}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <form action={deleteComment}>
          <input type="hidden" name="boardName" value={boardName} />
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="commentId" value={item._id} />
          <pre
            className="whitespace-pre-wrap font-light ml-2 mb-4"
            style={{ fontFamily: 'Pretendard' }}
          >
            {item.content}
          </pre>
          {boardName !== 'qna' ? (
            <Submit bgColor="black" size="medium">
              삭제
            </Submit>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
}

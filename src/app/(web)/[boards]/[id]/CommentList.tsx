import CommentNew from './CommentNew';
import CommentItem from './CommentItem';
import { fetchPost } from '@/data/fetch/postFetch';

export default async function CommentList({ params }: { params: { boards: string; id: string } }) {
  const id = params.id;
  const boards = params.boards;

  const data = await fetchPost(id);
  if (data === null) return null;
  const list = data.replies?.map((item) => (
    <CommentItem key={item._id} boardName={boards} postId={id} item={item} />
  ));
  // const list = [<CommentItem key={1} />, <CommentItem key={2} />];
  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2 border-b-[1px] border-gray-400 border-solid">
        댓글 {data.replies?.length || 0}개
      </h4>

      {list}
      {params.boards !== 'qna' ? <CommentNew postId={id} boardName={boards} /> : ''}
    </section>
  );
}

import Submit from '@/components/Submit';
import { addComment } from '@/data/actions/postAction';

export default function CommentNew({ boardName, postId }: { postId: string; boardName: string }) {
  return (
    <div className="p-4 border-gray-200 mb-40">
      {/* <h4 className="mb-4">새로운 댓글을 추가하세요.</h4> */}

      <form action={addComment}>
        <input type="hidden" name="boardName" value={boardName} />
        <input type="hidden" name="postId" value={postId} />

        <div className="mb-4">
          <textarea
            rows={3}
            cols={40}
            className="block p-2 w-full text-sm border border-gray-300 bg-gray-50 focus:outline-gray-400 focus:ring-2 focus:ring-blue-200 dark:bg-gray-200 dark:placeholder-gray-400 dark:text-black
                  "
            placeholder="내용을 입력하세요."
            name="comment"
          ></textarea>

          <p className="mt-3 text-sm text-red-500">내용은 필수입니다.</p>
        </div>
        <Submit size="sm">댓글 등록</Submit>
      </form>
    </div>
  );
}

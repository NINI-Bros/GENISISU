'use client';

import InputError from '@/components/InputError';
import Submit from '@/components/Submit';
import { addComment } from '@/data/actions/postAction';
import { PostComment } from '@/types';
import { FieldError, useForm } from 'react-hook-form';

export default function CommentNew({ boardName, postId }: { postId: string; boardName: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostComment>();
  const isWarningMargin = (fieldError: FieldError | undefined) => (fieldError ? '' : 'mb-6');

  const addReply = async (replyForm: PostComment) => {
    const res = await addComment(replyForm); // 프로그래밍 방식으로 서버 액션 호출
  };
  return (
    <div className="py-4 border-gray-200 mb-40">
      <form>
        <input type="hidden" value={postId} {...register('_id')} />
        <input type="hidden" value={boardName} {...register('boardName')} />
        <textarea
          rows={3}
          cols={40}
          maxLength={1000}
          className={`block ${isWarningMargin(
            errors.content
          )} p-2 w-full text-sm border border-gray-300 bg-gray-50 focus:outline-gray-400 focus:ring-2 focus:ring-blue-200 resize-none`}
          placeholder="내용을 입력하세요."
          {...register('content', { required: '내용은 필수입니다.' })}
        ></textarea>
        <InputError target={errors.content} />
        <div className="flex flex-row-reverse">
          <Submit onClick={handleSubmit(addReply)} size="sm">
            댓글 등록
          </Submit>
        </div>
      </form>
    </div>
  );
}

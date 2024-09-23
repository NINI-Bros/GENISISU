'use server';

import { ApiRes, CoreRes, SingleItem, Post, PostComment, PostForm } from '@/types/index';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
// import { redirect } from 'next/navigation';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT = process.env.NEXT_PUBLIC_CLIENT_ID;

// 게시물 등록
export async function createPost(postForm: PostForm): Promise<ApiRes<SingleItem<Post>>> {
  const session = await auth();
  const postData = {
    type: postForm.boardName,
    title:
      postForm.boardName === 'drive' ? postForm.title + ' 차량 시승 신청합니다.' : postForm.title,
    extra: {
      name: postForm.name,
    },
    phone: postForm.phone,
    address: postForm.address,
    content: postForm.content,
  };

  try {
    const res = await fetch(`${SERVER}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
        'client-Id': CLIENT,
      },
      body: JSON.stringify(postData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const response = await res.json();
    // redirect(`/${postData.boardName}`);
    return response;
  } catch (err) {
    console.error('Error adding post:', err);
    throw err;
  }
}

// 게시물 수정
export async function updatePost(postForm: PostForm): Promise<ApiRes<SingleItem<Post>>> {
  const session = await auth();
  const postData = {
    type: postForm.boardName,
    title: postForm.title,
    extra: {
      name: postForm.name,
    },
    phone: postForm.phone,
    address: postForm.address,
    content: postForm.content,
  };

  const res = await fetch(`${SERVER}/posts/${postForm.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
      'client-Id': CLIENT,
    },
    body: JSON.stringify(postData),
  });
  // redirect(`/${boardName}`);
  return res.json();
}

// 게시물 삭제
export async function deletePost(formData: FormData): Promise<CoreRes> {
  const session = await auth();
  const boardName = formData.get('boardName');
  const res = await fetch(`${SERVER}/posts/${formData.get('_id')}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
      'client-Id': CLIENT,
    },
  });
  setTimeout(redirect(`/${boardName}`), 100);
  return res.json();
}

// 여기서부터 댓글 영역
export async function addComment(formData: FormData): Promise<SingleItem<PostComment>> {
  const commentData = {
    content: formData.get('comment') || '',
  };
  // FormData에서 데이터 추출
  const postId = formData.get('postId') as string;
  // const commentContent = formData.get('commentContent') as string;
  const boardName = formData.get('boardName');
  // const comment = formData.get('comment');
  const session = await auth();

  // Fetch 요청
  const res = await fetch(`${SERVER}/posts/${postId}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
      'client-Id': CLIENT,
    },
    body: JSON.stringify(commentData),
  });

  // 응답 JSON 파싱
  const result = await res.json();
  // redirect(`/${boardName}/${postId}`);
  return result;
}
// (formData: FormData): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>>

export async function deleteComment(formData: FormData): Promise<CoreRes> {
  // console.log(formData);
  const boardName = formData.get('boardName');
  const postId = formData.get('postId');
  const commentId = formData.get('commentId');
  const session = await auth();
  const res = await fetch(`${SERVER}/posts/${postId}/replies/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
      'client-Id': CLIENT,
    },
  });

  // console.log(res);
  // redirect(`/${boardName}/${postId}`);
  return res.json();
}

'use server';

import { ApiRes, CoreRes, SingleItem, Post, PostComment } from '@/types/index';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT = process.env.NEXT_CLIENT_ID;

// 게시물 등록
export async function addPost(formData: FormData): Promise<ApiRes<SingleItem<Post>>> {
  const boardName = formData.get('boardName') as string;
  const session = await auth();
  const postData = {
    type: boardName,
    title: formData.get('title'),
    extra: {
      name: formData.get('name') as string,
    },
    phone: formData.get('phone') as string,
    content: formData.get('content') as string,
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
    redirect(`/${boardName}`);
    return response;
  } catch (err) {
    console.error('Error adding post:', err);
    throw err;
  }
}
// export async function addPost(formData: FormData): Promise<ApiRes<SingleItem<Post>>> {
//   const boardName = formData.get('boardName');
//   const session = await auth();
//   const postData = {
//     type: boardName,
//     // title: formData.get('title'),
//     extra: {
//       name: formData.get('name'),
//     },
//     phone: formData.get('phone'),
//     // address: formData.get('address'),
//     content: formData.get('content'),
//   };

//   try {
//     const res = await fetch(`${SERVER}/posts`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${session?.accessToken}`,
//         'client-Id': CLIENT,
//       },
//       body: JSON.stringify(postData),
//     });
//     const response = res.json();
//     console.log('res@@@@@@@@@@', response);
//   } catch (err) {
//     console.error(err);
//   }
//   return response;
//   // console.log('하이루', boardName);
//   // redirect(`/${boardName}`);
//   // redirect(`/${boards}`);
// }

// 게시물 수정
export async function updatePost(formData: FormData): Promise<ApiRes<SingleItem<Post>>> {
  const boardName = formData.get('boardName');
  const session = await auth();
  const postData = {
    // type: formData.get('type') || 'info',
    // title: formData.get('title') || '',
    // content: formData.get('content') || '',
    type: formData.get('type') || 'info',
    title: formData.get('title'),
    extra: {
      name: formData.get('name'),
    },
    phone: formData.get('phone'),
    address: formData.get('address'),
    content: formData.get('content'),
  };

  const res = await fetch(`${SERVER}/posts/${formData.get('_id')}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
      'client-Id': CLIENT,
    },
    body: JSON.stringify(postData),
  });
  redirect(`/${boardName}`);
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
  redirect(`/${boardName}`);
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
  redirect(`/${boardName}/${postId}`);
  return result;
}
// (formData: FormData): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>>

export async function deleteComment(formData: FormData): Promise<CoreRes> {
  console.log(formData);
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
  redirect(`/${boardName}/${postId}`);
  return res.json();
}

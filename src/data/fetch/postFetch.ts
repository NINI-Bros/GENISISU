import { ApiRes, MultiItem, Post, SingleItem } from '@/types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const LIMIT = process.env.NEXT_PUBLIC_LIMIT;
const DELAY = process.env.NEXT_PUBLIC_DELAY;
const CLIENT = process.env.NEXT_CLIENT_ID;

// 게시물 목록 전체 조회
export async function fetchPosts(
  type: string | undefined,
  page?: string,
  keyword?: string
): Promise<Post[]> {
  const params = new URLSearchParams();
  type && params.set('type', type);
  page && params.set('page', page);
  keyword && params.set('keyword', keyword);
  const sort = JSON.stringify({ _id: -1 });
  params.set('sort', sort);
  params.set('limit', LIMIT!);
  params.set('delay', DELAY!);
  const url = `${SERVER}/posts?${params.toString()}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': CLIENT,
    },
    next: { revalidate: 0 }, // Revalidate every 60 seconds 캐시가 저장 된 데이타를 돌려주는건데 이거를 저장하지말고 돌려줘! 하는거임
  });
  const resJson: ApiRes<MultiItem<Post>> = await res.json();
  // console.log(resJson);
  if (!resJson.ok) {
    throw new Error('게시물 목록 조회 실패');
  }
  return resJson.item;
}

// 상세 조회
export async function fetchPost(_id: string) {
  const url = `${SERVER}/posts/${_id}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'client-Id': CLIENT,
    },
  });
  const resJson: ApiRes<SingleItem<Post>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  console.log(resJson.item);
  return resJson.item;
}

import { ApiRes, MultiItem, Pagination, Post, SingleItem } from '../../../types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DELAY = process.env.NEXT_PUBLIC_DELAY;
const CLIENT = process.env.NEXT_PUBLIC_CLIENT_ID;
const LIMIT = '10';

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
    next: { revalidate: 15 }, // Revalidate every 15 seconds, 캐시 타임 설정
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
    // 댓글 작성하면 바로 보여야하므로 0ms로 설정
    next: { revalidate: 0 }, // Revalidate every 0 seconds, 캐시 타임 설정
  });
  const resJson: ApiRes<SingleItem<Post>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  // console.log(resJson.item);
  return resJson.item;
}

export async function fetchPagination(
  type: string | undefined,
  page: string,
  keyword?: string
): Promise<Pagination> {
  const params = new URLSearchParams();
  type && params.set('type', type);
  page && params.set('page', page);
  keyword && params.set('keyword', keyword);
  params.set('limit', LIMIT!);
  params.set('delay', DELAY!);
  const url = `${SERVER}/posts?${params.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': CLIENT,
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  const resJson: ApiRes<MultiItem<Post>> = await res.json();
  if (!resJson.ok) {
    throw new Error('페이지네이션 조회 실패');
  }
  return resJson.pagination;
}

import { Pagination } from './response';
import { UserData } from './user';

export interface PostComment {
  _id: number;
  user_id: number;
  user: UserData;
  content: string;
  like: number;
  createdAt: string;
  updatedAt: string;
  boardName: string;
}

export interface Post {
  _id: number;
  type?: string;
  title: string;
  phone: string;
  model: string;
  extra?: { name: string };
  address: string;
  content: string;
  user: Pick<UserData, '_id' | 'name' | 'image'>;
  views: number;
  repliesCount: number;
  replies?: PostComment[];
  createdAt: string;
  updatedAt: string;
}

export interface BoardTitle {
  title: string;
  tableTitle01: string;
  tableTitle02: string;
  tableTitle03: string;
  btnTitle: string;
}

export interface ListState {
  listJsx: JSX.Element[] | null;
  pagination: Pagination | null;
  typingWord: string;
  searchWord: string;
  thisPage: string;
}

export type PostForm = {
  boardName: 'drive' | 'info' | 'qna';
  title: string;
  extra: string;
  phone: string;
  address?: string;
  content: string;
  id?: string;
};

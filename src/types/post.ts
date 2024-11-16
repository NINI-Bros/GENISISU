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
  type: string;
  title: string;
  phone: string;
  model: string;
  name: string;
  address: string;
  content: string;
  user: Pick<UserData, '_id' | 'name' | 'image'>;
  views: number;
  repliesCount: number;
  replies?: PostComment[];
  createdAt: string;
  updatedAt: string;
  extra?: {
    subTitle: string;
    subContent: string;
    contentType: 'event' | 'award';
    awardTitle: string;
  };
}

export interface BoardTitle {
  mainTitle: string;
  tableTitle: string;
  tableAuthor: string;
  tableDate: string;
  submitBtnName: string;
}

export interface ListState {
  typingWord: string;
}

export type PostForm = {
  boardName: 'drive' | 'info' | 'qna';
  title: string;
  name: string;
  phone: string;
  address?: string;
  content: string;
  id?: string;
};

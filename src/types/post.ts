import { UserData } from './user';

export interface PostComment {
  _id: number;
  user_id: number;
  user: UserData;
  content: string;
  like: number;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: number;
  type?: string;
  title: string;
  name: string;
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

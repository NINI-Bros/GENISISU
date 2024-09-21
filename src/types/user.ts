export interface CommonType {
  _id: number;
  extra?: {
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserData extends CommonType {
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  type: 'user' | 'seller' | 'admin';
  loginType?: 'email' | 'kakao' | 'google';
  image: string;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
}

export type UserInToken = Required<Pick<UserData, '_id' | 'name'>> &
  Pick<UserData, 'image'> & {
    accessToken: string;
    refreshToken: string;
  };

export type UserForm = {
  type: 'user' | 'seller';
  name: string;
  email: string;
  password: string;
  attach?: string | string[];
  image?: string;
};

export type UserLoginForm = Pick<UserForm, 'email' | 'password'>;

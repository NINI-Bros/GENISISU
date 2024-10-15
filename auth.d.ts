import { AuthBase as Base } from 'next-auth';

declare module 'next-auth' {
  interface ExtraInfo {
    gender: string;
    age: number;
  }

  interface AuthBase extends Base {
    _id: number;
    type: string;
    email?: string;
    name?: string;
    profileImage?: string;
    accessToken: string;
    refreshToken: string;
    createdAt?: string;
    updatedAt?: string;
    extra?: ExtraInfo;
  }

  interface User extends AuthBase {}

  interface Session extends AuthBase {
    user: User;
  }
}

export declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}

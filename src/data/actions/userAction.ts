// 서버 액션 정의
'use server';

import { signIn } from '@/auth';
import {
  ApiRes,
  ApiResWithValidation,
  CoreErrorRes,
  FileRes,
  MultiItem,
  OAuthUser,
  SingleItem,
  UserData,
  UserForm,
  UserLoginForm,
} from '@/types';
import { redirect } from 'next/navigation';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function signup(
  formData: FormData
): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {
  const userData = {
    type: formData.get('type') || 'user',
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    image: '',
  };

  // 이미지 먼저 업로드
  const attach = formData.get('attach') as File;

  if (attach?.size > 0) {
    // 프로필 이미지를 추가한 경우
    const fileRes = await fetch(`${SERVER}/files`, {
      method: 'POST',
      headers: {
        'client-id': CLIENT,
      },
      body: formData,
    });

    if (!fileRes.ok) {
      throw new Error('파일 업로드 실패');
    }
    const fileData: MultiItem<FileRes> = await fileRes.json();
    // 서버로부터 응답받은 이미지 이름을 회원 정보에 포함
    userData.image = fileData.item[0].path;
  }

  const res = await fetch(`${SERVER}/users`, {
    method: 'POST',
    headers: {
      'client-id': CLIENT,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const signupData = await res.json();
  console.log('SignUp data', signupData);
  return signupData;
}

// Auth.js 기반 아이디/패스워드 인증 로직
export async function signInWithCredentials(
  loginData: UserLoginForm
): Promise<ApiResWithValidation<SingleItem<UserForm>, UserLoginForm>> {
  console.log('signInWithCredentials 로그인 결과', loginData);
  try {
    const result = await signIn('credentials', {
      ...loginData,
      redirect: false,
    });
    console.log(result);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return err.cause as CoreErrorRes;
    }
  }
  redirect('/');
}

// 아이디/패스워드 로그인
export async function login(
  userObj: UserLoginForm
): Promise<ApiResWithValidation<SingleItem<UserData>, UserLoginForm>> {
  const res = await fetch(`${SERVER}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': CLIENT,
    },
    body: JSON.stringify(userObj),
  });
  return res.json();
}

// auth provider 인증 후 자동 회원 가입
export async function signupWithOAuth(
  user: OAuthUser
): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {
  const res = await fetch(`${SERVER}/users/signup/oauth`, {
    method: 'POST',
    headers: {
      'client-id': CLIENT,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  return res.json();
}

// auth provider로 인증된 사용자 로그인
export async function loginOAuth(providerAccountId: string): Promise<ApiRes<SingleItem<UserData>>> {
  const res = await fetch(`${SERVER}/users/login/with`, {
    method: 'POST',
    headers: {
      'client-id': CLIENT,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ providerAccountId }),
  });
  return res.json();
}

// DB 카카오 로그인
export async function loginWithKakao(
  code: string, // 카카오 인증 코드
  redirectUri: string, // 카카오 인가 코드 받기 API에 사용한 redirect_uri 값
  user: Partial<UserData> = {} // 추가적인 사용자 정보
): Promise<ApiRes<SingleItem<UserData>> | undefined> {
  const userData = {
    code,
    redirect_uri: redirectUri,
    user,
  };
  const res = await fetch(`${SERVER}/users/login/kakao`, {
    method: 'POST',
    headers: {
      'client-id': `${CLIENT}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return await res.json();
}

// 구글 로그인
export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/' });
}

// 제네시스 로그인
export async function signInWithGenesis() {
  await signIn('genesis', { redirectTo: '/' });
}

// 현대 로그인
export async function signInWithHyundai() {
  await signIn('genesis', { redirectTo: '/' });
}

// 네이버 로그인
export async function signInWithNaver() {
  await signIn('naver', { redirectTo: '/' });
}

// 카카오 로그인
export async function signInWithKakao() {
  await signIn('kakao', { redirectTo: '/' });
}

// 깃허브 로그인
export async function signInWithGithub() {
  await signIn('github', { redirectTo: '/' });
}

// 서버 액션 정의
'use server';

import { generateState } from '@/app/util/generateState';
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
    image: `/files/${CLIENT}/profile-image-user.jpg`, // default 이미지
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

// 구글 로그인
export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/' });
}

// 현대 로그인
// export async function signInWithHyundai() {
//   await signIn('genesis', { redirectTo: '/' });
// }

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

// 제네시스 로그인
export async function signInWithGenesis(code: string) {
  // DB에서 id를 조회해서 있으면 로그인 처리하고 없으면 자동 회원 가입 후 로그인 처리
  try {
    const resToken = await fetchGenesisToken(code);
    if (resToken.access_token) {
      const profile = await fetchGenesisProfile(resToken.access_token);
      console.log('profile: ', profile);

      // 자동 회원 가입
      const newUser = {
        type: 'user',
        loginType: 'genesis',
        name: profile.name,
        email: `${Date.now()}@genisisu.com`,
        image: `/files/${CLIENT}/profile-image-user.jpg`,
        password: '11111111',
      };
      const userData = new FormData();

      Object.keys(newUser).forEach((key) => {
        userData.append(key, newUser[key as keyof typeof newUser]);
      });

      // 이미 가입된 회원이면 회원가입이 되지 않고 에러를 응답하므로 무시하면 됨
      const resSignup = await signup(userData);
      console.log('회원가입', resSignup);

      // 자동 로그인
      const loginData = {
        email: newUser.email,
        password: newUser.password,
      };
      const resData = await signInWithCredentials(loginData);
      if (!resData) {
        console.log('자동 로그인', loginData);
      } else if (!resData.ok) {
        // API 서버의 에러 메시지 처리
        console.log(resData.message);
      }
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchGenesisAuth() {
  const params = new URLSearchParams();
  params.set('clientId', process.env.GENESIS_CLIENT_ID);
  params.set('host', SERVER); // 제네시스 디벨로퍼스에 등록한 계정 API Redirect URL 도메인
  params.set('state', 'GENESIS' + generateState(9)); // 16자리의 랜덤 문자열 생성

  const url = `https://accounts.genesis.com/api/authorize/ccsp/oauth?${params.toString()}`;
  // console.log(url);
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'manual',
  });
  // console.log(response); // Content-type: 'text/html'

  // 리디렉션 URL을 추출
  if (response.status === 301 || response.status === 302) {
    let redirectUrl = response.url;
    if (redirectUrl) {
      redirect(redirectUrl);
    } else {
      console.error('리디렉션 URL을 찾을 수  없습니다.');
    }
  } else {
    console.error('리디렉션이 예상대로 이루어지지 않았습니다.');
  }
}

export async function fetchGenesisToken(code: string) {
  const params = new URLSearchParams();
  params.set('grant_type', 'authorization_code'); // 'refresh_token', 'delete'
  params.set('code', code);
  params.set('redirect_uri', SERVER + '/login');

  const url = 'https://accounts.genesis.com/api/account/ccsp/user/oauth2/token';
  const decoded_data = process.env.GENESIS_CLIENT_ID + ':' + process.env.GENESIS_CLIENT_SECRET;
  const basic_token = 'Basic ' + Buffer.from(decoded_data, 'utf-8').toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: basic_token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await response.json();
  return data;
}

export async function fetchGenesisProfile(accessToken: string) {
  const url = 'https://prd-kr-ccapi.genesis.com:8081/api/v1/user/profile';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

// 현대멤버스 로그인
export async function signInWithHyundai(code: string) {
  // DB에서 id를 조회해서 있으면 로그인 처리하고 없으면 자동 회원 가입 후 로그인 처리
  try {
    const resToken = await fetchHyundaiToken(code);
    // console.log('resToken', resToken);
    if (resToken.access_token) {
      const profile = await fetchHyundaiProfile(resToken.access_token);
      console.log('profile: ', profile);

      // 자동 회원 가입
      const newUser = {
        type: 'user',
        loginType: 'hyundai',
        name: profile.name,
        email: `${Date.now()}@genisisu.com`,
        image: `/files/${CLIENT}/profile-image-user.jpg`,
        password: '11111111',
      };
      const userData = new FormData();

      Object.keys(newUser).forEach((key) => {
        userData.append(key, newUser[key as keyof typeof newUser]);
      });

      // 이미 가입된 회원이면 회원가입이 되지 않고 에러를 응답하므로 무시하면 됨
      const resSignup = await signup(userData);
      console.log('회원가입', resSignup);

      // 자동 로그인
      const loginData = {
        email: newUser.email,
        password: newUser.password,
      };
      const resData = await signInWithCredentials(loginData);
      if (!resData) {
        console.log('자동 로그인', loginData);
      } else if (!resData.ok) {
        // API 서버의 에러 메시지 처리
        console.log(resData.message);
      }
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchHyundaiAuth() {
  const params = new URLSearchParams();
  params.set('response_type', 'code');
  params.set('client_id', process.env.HYUNDAI_CLIENT_ID);
  params.set('redirect_uri', SERVER + '/login');
  params.set('state', 'HYUNDAI' + generateState(9)); // 16자리의 랜덤 문자열 생성

  const url = `https://prd.kr-ccapi.hyundai.com/api/v1/user/oauth2/authorize?${params.toString()}`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'manual',
  });
  // console.log(response); // Content-type: 'text/html'

  // 리디렉션 URL을 추출
  if (response.status === 301 || response.status === 302) {
    const redirectUrl = response.url;
    if (redirectUrl) {
      redirect(redirectUrl + params.toString());
    } else {
      console.error('리디렉션 URL을 찾을 수  없습니다.');
    }
  } else {
    console.error('리디렉션이 예상대로 이루어지지 않았습니다.');
  }
}

export async function fetchHyundaiToken(code: string) {
  const params = new URLSearchParams();
  params.set('grant_type', 'authorization_code'); // 'refresh_token', 'delete'
  params.set('code', code);
  params.set('redirect_uri', SERVER + 'login'); // 배포용

  const url = 'https://prd.kr-ccapi.hyundai.com/api/v1/user/oauth2/token';
  const decoded_data = process.env.HYUNDAI_CLIENT_ID + ':' + process.env.HYUNDAI_CLIENT_SECRET;
  const basic_token = 'Basic ' + Buffer.from(decoded_data, 'utf-8').toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: basic_token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  return response.json();
}

export async function fetchHyundaiProfile(accessToken: string) {
  const url = 'https://prd.kr-ccapi.hyundai.com/api/v1/user/profile';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

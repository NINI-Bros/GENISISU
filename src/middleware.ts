import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export default async function middleware(request: NextRequest) {
  console.log('미들웨어 호출', request.nextUrl.href);
  const session = await auth();

  // 로그인 되지 않은 경우
  // if (!session?.user) { return NextResponse.redirect(`${request.nextUrl.origin}/login`); }

  // 공지사항 글작성 페이지에 관리자가 아닌 일반 유저가 접근한 경우
  if (request.nextUrl.pathname.startsWith('/info') && session?.user.type !== 'admin') {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/info/new'],
};

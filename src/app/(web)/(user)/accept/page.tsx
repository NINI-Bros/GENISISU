import { Metadata } from 'next';

import SignWrapSet from './SignWrapSet';

export const metadata: Metadata = {
  metadataBase: new URL('https://genisisu.vercel.app'),
  title: '통합 회원가입 - GENISISU',
  description: 'GENISISU 통합 회원가입 페이지',
  openGraph: {
    title: '통합 회원가입 - GENISISU',
    description: '무료 통합 회원가입 & 로그인 후 GENISISU의 모든 서비스를 이용하세요.',
    url: '/signup',
    images: {
      url: '/images/genisisu_logo_og.jpg',
    },
  },
};

export default function Page() {
  return <SignWrapSet />;
}

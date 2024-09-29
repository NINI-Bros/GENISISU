'use client'

import './css/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import SideBar from '@/components/layout/SideBar';
import { SessionProvider } from '@/hook/session';


export default function RootLayout({ children, session }: Readonly<{children: React.ReactNode, session:Session}>) {
    const url = usePathname();
    const isMain = url === "/" ? "mainHd" : "";

    return (
        <html lang="ko">
            <head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* <meta name="description" content="제니시수연 구매 홍보 페이지" /> */}
                <meta name="keywords" content="제니시수연, 재니시수, 현대모간스, 현대모건스" />
                <meta name="author" content="김모건, 이수연, 류재준" />

                <meta property="og:title" content="현대모간스 - 제니시수연" />
                <meta property="og:description" content="유용한 정보를 나누고 공유하세요." />
                <meta property="og:image" content="/images/fesp.webp" />
                <meta property="og:url" content="https://community.fesp.shop" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="현대모간스" />
            </head>
            <body>
                {/* 로그인 세션정보 분배 컴포넌트 */}
                {/* <SessionProvider session={session}>  */}
                <SessionProvider>
                    <Header isMain={isMain} />
                        <div className='childrenWrap'>
                          {children}
                          <SideBar/>
                        </div>
                    <Footer/>
                </SessionProvider>
            </body>
        </html>
    );
}
import './css/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SideBar from '@/components/layout/SideBar';
import { SessionProvider } from '@/hook/useSession';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ButtonTop from '@/components/ButtonTop';

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* <meta name="description" content="제니시수연 구매 홍보 페이지" /> */}
        <meta name="keywords" content="제니시수, 현대모건스" />
        <meta name="author" content="김모건, 류재준, 이수연" />

        <meta property="og:title" content="GENISISU - 현대모건스 제니시수연" />
        <meta property="og:description" content="나만의 차량을 꾸미고 구매해 보세요" />
        <meta property="og:image" content="/images/genisisu_logo_og.jpg" />
        <meta property="og:url" content="https://genisisu.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GENISISU" />
      </head>
      <body>
        {/* 로그인 세션정보 분배 컴포넌트 */}
        <SessionProvider>
          <Header />
          <div className="childrenWrap">
            {children}
            <SideBar />
            <Analytics />
            <SpeedInsights />
          </div>
          <Footer />
          <ButtonTop />
        </SessionProvider>
        {modal}
        <div id="boardModal"></div>
      </body>
    </html>
  );
}

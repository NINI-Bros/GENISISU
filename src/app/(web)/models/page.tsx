import { fetchVehicles } from '@/data/fetch/productFetch';

import ScrollToTop from '@/components/ScrollToTop';
import ViewModelResult from './ViewModelResult';

export function generateMetadata() {
  const metadataBase = new URL('https://genisisu.vercel.app');
  return {
    metadataBase,
    title: '모델 - GENISISU',
    description: 'GENISISU 모델 목록 페이지',
    openGraph: {
      title: `모델 - GENISISU`,
      description: `GENISISU 모델 목록 페이지입니다.`,
      url: `/models`,
      images: {
        url: '/images/genisisu_logo_og.jpg',
      },
    },
  };
}

export default async function ListPage() {
  const data = await fetchVehicles();

  return (
    <main className="bg-black flex flex-col py-10 px-28 max-[1366px]:px-[7%]">
      <ScrollToTop />
      <ViewModelResult data={data} />
    </main>
  );
}

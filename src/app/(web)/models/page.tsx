import { fetchVehicles } from '@/data/fetch/productFetch';

import ModelCard from './ModelCard';
import ScrollToTop from '@/components/ScrollToTop';

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
  const productCard = data.map((model, index) => <ModelCard key={index} model={model} />);
  return (
    <main className="bg-black pt-40 px-28 max-[1366px]:px-[7%] max-[1366px]:pt-20">
      <ScrollToTop />
      <ul className="grid grid-cols-4 max-[1366px]:grid-cols-3 max-[890px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6 text-white">
        {productCard}
      </ul>
    </main>
  );
}

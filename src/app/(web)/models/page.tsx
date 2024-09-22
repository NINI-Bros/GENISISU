import { fetchVehicles } from '@/data/fetch/productFetch';

import ModelCard from './ModelCard';

export function generateMetadata() {
  return {
    title: '모델 - Genisisu',
    description: '모델 목록 페이지',
    openGraph: {
      title: `모델 - Genisisu`,
      description: `모델 목록 페이지 입니다.`,
      url: `/models`,
      images: {
        url: '/images/genisisu_logo_b.png',
      },
    },
  };
}

export default async function ListPage() {
  const data = await fetchVehicles();
  const productCard = data.map((model, index) => <ModelCard key={index} model={model} />);
  return (
    <main className="bg-black pt-40 px-28 max-[1366px]:px-4 max-[1366px]:pt-20">
      <ul className="grid grid-cols-4 max-[1366px]:grid-cols-3 max-[890px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6 text-white">{productCard}</ul>
    </main>
  );
}

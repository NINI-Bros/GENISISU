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
  // console.log(data);
  const productCard = data.map((model, index) => <ModelCard key={index} model={model} />);
  return (
    <main className="bg-black pt-40 pl-28 pr-28">
      <ul className="grid grid-cols-4 gap-6 text-white">{productCard}</ul>
    </main>
  );
}

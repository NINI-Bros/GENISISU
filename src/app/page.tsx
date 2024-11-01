import MainPagination from '../components/home/MainPagination';
import { fetchPromotions, fetchVehicles } from '@/data/fetch/productFetch';
import Video from '@/components/home/Video';
import Vehicles from '@/components/home/Vehicles';
import Events from '@/components/home/Events';
import Awards from '@/components/home/Awards';
import TestDriveApplication from '@/components/home/TestDriveApplication';

export default async function RootPage() {
  const PromotionData = await fetchPromotions();
  const modelData = await fetchVehicles();
  return (
    <>
      <MainPagination />
      <main className="mainPage">
        <Video data={PromotionData} />
        <Vehicles data={modelData} />
        <Events />
        <Awards />
        <TestDriveApplication boardName={'drive'} />
      </main>
    </>
  );
}

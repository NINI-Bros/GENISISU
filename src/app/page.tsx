import MainPagination from '../components/home/MainPagination';
import { fetchPromotions, fetchVehicles } from '@/data/fetch/productFetch';
import Video from '@/components/home/Video';
import Vehicles from '@/components/home/Vehicles';
import Events from '@/components/home/Events';
import Awards from '@/components/home/Awards';
import TestDriveApplication from '@/components/home/TestDriveApplication';
import { fetchPost, fetchPosts } from '@/data/fetch/postFetch';

export default async function RootPage() {
  const promotionData = await fetchPromotions();
  const modelData = await fetchVehicles();
  const eventData = (await fetchPosts('info')).filter(
    (item) => item.extra?.contentType === 'event'
  );

  return (
    <>
      <MainPagination />
      <main className="mainPage">
        <Video data={promotionData} />
        <Vehicles data={modelData} />
        <Events data={eventData} />
        <Awards />
        <TestDriveApplication boardName={'drive'} />
      </main>
    </>
  );
}

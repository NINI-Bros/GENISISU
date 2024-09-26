import MainPagination from '../components/mainPageComponents/MainPagination';
import { fetchVehicles } from '@/data/fetch/productFetch';
import Event1 from '@/components/mainPageComponents/Event1';
import Event2 from '@/components/mainPageComponents/Event2';
import Event3 from '@/components/mainPageComponents/Event3';
import Event4 from '@/components/mainPageComponents/Event4';
import Event5 from '@/components/mainPageComponents/Event5';

export default async function RootPage() {
  const modelData = await fetchVehicles();
  return (
    <>
      <MainPagination />
      <main className="mainPage">
        <Event1 />
        <Event2 data={modelData} />
        <Event3 />
        <Event4 />
        <Event5 boardName={'drive'} />
      </main>
    </>
  );
}

import { fetchOptions, fetchVehicles } from '@/data/fetch/productFetch';
import { VehicleInfo } from '@/types/payments';
import PaymentsAction from './PaymentsAction';

export default async function Payments({
  params,
}: {
  params: {
    model: string;
    option: string;
  };
}) {
  // 데이터 호출
  const vehicleData = await fetchVehicles();
  const data = await fetchOptions();

  // 데이터 세팅
  const vehicleInfo: VehicleInfo[] = vehicleData.map((item) => ({
    name: item.name,
    image: item.mainImages[2].path,
    price: item.price,
  }));
  const optionData = data.map((item) => item.extra.option);

  return <PaymentsAction vehicleInfo={vehicleInfo} optionData={optionData} params={params} />;
}

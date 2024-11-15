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
  const [vehicleResponse, optionsResponse] = await Promise.all([fetchVehicles(), fetchOptions()]);

  // 데이터 세팅
  const vehicleData: VehicleInfo[] = vehicleResponse.map((item) => ({
    name: item.name,
    image: item.mainImages[2].path,
    price: item.price,
  }));
  const optionData = optionsResponse.map((item) => item.extra.option);

  return <PaymentsAction vehicleInfo={vehicleData} optionData={optionData} params={params} />;
}

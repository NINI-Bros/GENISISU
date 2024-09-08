import { fetchOptionExterior, fetchOptions, fetchProducts, fetchVehicles } from "@/data/fetch/productFetch";
import PaymentsAction from "./PaymentsAction";
import { ModelOption } from "@/types/product";

interface VehicleInfo {
  name:string,
  image:string,
  price:number,
}

export default async function Payments () {

  const vehicleOriginData = await fetchProducts();
  const data = await fetchOptions();
  const optionOriginData = data.map(item => item.extra.option)
  // console.log('데이터확인-----',vehicleOriginData)
  // console.log('데이터길이확인-----',modelDataOption.length)

  // const exteriorData = optionOriginData.filter((item)=>item.exterior)
  const exteriorOriginData = await fetchOptionExterior('exterior') || [];
  const exteriorData = exteriorOriginData[0]

  
  const optionData = optionOriginData.filter((item)=>!item.exterior)
  


  const vehicleData = await fetchVehicles();
  const vehicleInfo : VehicleInfo[] = vehicleData.map(item => ({
    name:item.name,
    image:item.mainImages[2].path,
    price:item.price,
  }))
  // console.log('비휘클 맵 확인:::',vehicleInfo)
  // console.log('확인:::',vehicleData.map((item)=>item.price.toLocaleString()))

  // OptionExterior 타입지정하고 exterior도 넘겨줘야함 총 3개 넘겨줘야함
  return(
    <PaymentsAction vehicleInfo={vehicleInfo} optionData={optionData} exteriorData={exteriorData}/>
  )
}

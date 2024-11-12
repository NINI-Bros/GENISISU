import { fetchOption, fetchProduct, fetchVehicles } from '@/data/fetch/productFetch';
import Section1Index from './(section)/Section1Index';
import Section2Intro from './(section)/Section2Intro';
import Section3Color from './(section)/Section3Color';
import Section4Exterior from './(section)/Section4Exterior';
import Section5Interior from './(section)/Section5Interior';
import Section6Spec from './(section)/Section6Spec';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export const dynamicParams = false;

export async function generateStaticParams() {
  const vehicles = await fetchVehicles();
  return vehicles.map(({ _id, name }) => {
    if (name !== 'neolun-concept') {
      return { model: _id.toString() };
    }
  });
}

export default async function OrderPage({ params }: { params: { model: string } }) {
  const modelIndex: string = params.model;
  const modelData = await fetchProduct(params.model);
  const imageArray = modelData.extra.detail.view360Images.map((image) => SERVER + image.path) || [];
  const modelName = modelData.name || '';
  const abstract = modelData.extra.detail.abstract;
  const exterior = modelData.extra.detail.exterior;
  const interior = modelData.extra.detail.interior;
  const spec = modelData.extra.detail.spec;
  const res = (await fetchOption('exterior')) || [];
  const optionData = res[0].extra.option.exterior[modelName];

  return (
    <>
      {/* 첫번째 섹션 : 360도 이미지 */}
      <Section1Index modelIndex={modelIndex} modelData={modelData} imageArray={imageArray} />

      {/* 두번째 섹션 : 동영상 or 이미지 fixed 후 text 스크롤링 */}
      <Section2Intro abstract={abstract} />

      {/* 세번째 섹션 : 색상선택 옵션 */}
      <Section3Color optionData={optionData} />

      {/* 네번째 섹션 : 외장디자인 설명 */}
      <Section4Exterior exterior={exterior} />

      {/* 다섯번재 섹션 : 내장디자인 설명 */}
      <Section5Interior interior={interior} />

      {/* 여섯번째 섹션(마지막) : 테이블 스펙 */}
      <Section6Spec spec={spec} />
    </>
  );
}

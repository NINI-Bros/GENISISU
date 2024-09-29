import { Spec } from '@/types/product';
import Image from 'next/image';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export default function Section6Spec({ spec }: { spec: Spec }) {
  const engineImage = SERVER + spec.engine[0].image.path;
  const listNormalSpec = Object.keys(spec)
    .filter((item) => item !== 'engine' && item !== 'images')
    .map((item, idx) => {
      return (
        <tr key={idx} className="grid grid-cols-2 gap-x-[120px]">
          <th className="text-left">{item.toUpperCase()}</th>
          <td className="text-center">{spec[item]}</td>
        </tr>
      );
    });
  const listEngineSpec = Object.keys(spec.engine[0])
    .filter((item) => item !== 'image' && item !== 'title')
    .map((item, idx) => {
      return (
        <tr key={idx} className="grid grid-cols-2 gap-x-[120px]">
          <th className="text-left">{item.toUpperCase()}</th>
          <td className="text-center">{spec.engine[0][item]}</td>
        </tr>
      );
    });
  // console.log(list);

  return (
    <section className="bg-white text-black px-[160px] py-[200px] box-border flex flex-col items-center gap-y-[270px]">
      <article className="flex flex-col items-center">
        <h2 className="text-[50px]">제품 엔진 스펙</h2>
        <table>
          <tbody>
            {/* 엔진이 3개일때 grid-cols-4, 2개일때는 grid-cols-3, 1개일때는 grid-cols-2 */}
            <tr className="grid grid-cols-2 gap-x-[120px]">
              <th className=""></th>

              {/* default - 엔진1개 */}
              <td className="col-span-2">
                <figure className="w-[1000px] h-[500px]">
                  <Image
                    src={engineImage}
                    width={0}
                    height={0}
                    sizes="100%"
                    className="w-full"
                    alt=""
                  />
                </figure>
                <h3 className="text-[30px] mb-[120px] text-center">{spec.engine[0].title}</h3>
              </td>

              {/* 엔진이 1개일 때 써주세요 */}
              {/* <td className="col-span-2">
                  <img src="/images/detail/spec_1.png" className="w-full" alt="" />
                  <h3 className="text-[30px] mb-[120px] text-center">가솔린 3.5 터보 48V 일렉트릭 슈퍼차저</h3>
                </td> */}

              {/* 엔진이 2개일때 써주세요 */}
              {/* <td className="">
                  <img src="/images/detail/spec_1.png" className="w-full" alt="" />
                  <h3 className="text-[15px] mb-[120px] text-center">가솔린 3.5 터보 48V 일렉트릭 슈퍼차저</h3>
                </td>
                <td className="">
                  <img src="/images/detail/spec_1.png" className="w-full" alt="" />
                  <h3 className="text-[15px] mb-[120px] text-center">가솔린 3.5 터보 48V 일렉트릭 슈퍼차저</h3>
                </td> */}

              {/* 엔진이 3개일때 써주세요 */}
              {/* <td className="">
                  <img src="/images/detail/spec_1.png" className="w-full" alt="" />
                  <h3 className="text-[13px] mb-[120px] text-center">가솔린 3.5 터보 48V 일렉트릭 슈퍼차저</h3>
                </td> */}
            </tr>
          </tbody>
        </table>

        <table className="text-[30px]">
          <tbody className="flex flex-col gap-y-[40px]">
            {/* 2번째, 3번째 엔진이 추가될때마다 td를 복사해서 넣어주셔야 합니다*/}
            {/* 엔진이 3개일때 tr마다 grid-cols-4, 2개일때는 grid-cols-3, 1개일때는 grid-cols-2 */}
            {listEngineSpec}
            {listNormalSpec}
          </tbody>
        </table>
      </article>
      <article className="flex flex-col items-center">
        <h2 className="text-[50px] mb-[120px]">제품 외장 스펙</h2>
        <div className="flex">
          {/* 엔진 갯수가 추가될때마다 img 태그 복사해서 경로붙여넣어주세요 */}
          <img src={SERVER + spec.images[0].path} alt="" />
          <img src={SERVER + spec.images[1].path} alt="" />
          <img src={SERVER + spec.images[2].path} alt="" />
        </div>
      </article>
    </section>
  );
}

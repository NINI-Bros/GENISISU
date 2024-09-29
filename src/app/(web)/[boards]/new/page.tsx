'use client';

import AddBoard from '@/components/drive/AddBoard';
import { useModelStore } from '@/zustand/useModel';

export default function NewPage({ params }: { params: { boards: string } }) {
  const { places } = useModelStore();
  let title = '';
  if ('qna' === params.boards) {
    title = 'QnA 신청';
  } else if ('drive' === params.boards) {
    title = '전시시승 신청';
  } else {
    title = '공지사항 작성';
  }

  return (
    <main
      id="drivePage"
      className="min-w-80 py-16 px-40 bg-white max-[1366px]:px-[0%] max-[1366px]:pb-0 max-[1366px]:py-8"
    >
      <div className="drive">
        <div className="text-center py-4">
          <h2 className="pb-12 text-5xl font-medium leading-none text-black max-[1366px]:pb-0 max-[1366px]:text-[34px]">
            {title}
          </h2>
        </div>
        <AddBoard isMain={false} params={{ boards: params.boards }} />

        <div className="text-center py-4 max-[1366px]:mt-10 max-[1366px]:px-[7%]">
          <h2 className="pb-12 text-5xl font-medium text-black max-[1366px]:text-[32px] max-[1366px]:pb-6">
            제니시수 플레이스
          </h2>
        </div>
        <section className="mb-20 bbs_mobile_place max-[1366px]:px-[7%]">
          <table className="border-collapse w-full table-fixed">
            <colgroup>
              <col className="w-[30%] max-[1366px]:w-full" />
              <col className="w-[45%] max-[1366px]:w-0" />
              <col className="w-[25%] max-[1366px]:w-0" />
            </colgroup>

            <tbody className="border-t border-solid border-black">
              {places.map((place, idx) => (
                <tr
                  key={place.name + idx}
                  className="border-b border-solid border-ccc max-[1366px]:mb-10 max-[1366px]:justify-items-center"
                >
                  <th className="w-full p-4 whitespace-nowrap font-medium bg-gray-100">
                    {place.name}
                  </th>
                  <td className="p-4 whitespace-nowrap font-light max-[1366px]:whitespace-normal max-[1366px]:break-keep max-[1366px]:text-center">
                    {place.address}
                  </td>
                  <td className="p-4 whitespace-nowrap font-light max-[1366px]:py-1">
                    {place.telephone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}

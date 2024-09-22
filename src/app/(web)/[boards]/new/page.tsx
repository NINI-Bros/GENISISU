'use client';

import AddBoard from "@/components/drive/AddBoard";
import { useModelStore } from "@/zustand/useModel";

export default function drive({ params }: { params: { boards: string } }) {
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
    <main id="drivePage" className="min-w-80 py-16 px-40 bg-white">
      <div className="drive">
        <div className="text-center py-4">
          <h2 className="pb-12 text-5xl font-medium text-black">{title}</h2>
        </div>
        <AddBoard isMain={false} params={{ boards: params.boards }} />

        <div className="text-center py-4">
          <h2 className="pb-12 text-5xl font-medium text-black">제니시수 플레이스</h2>
        </div>
        <section className="mb-20">
          <table className="border-collapse w-full table-fixed">
            <colgroup>
              <col className="w-[30%]" />
              <col className="w-[45%]" />
              <col className="w-[25%]" />
            </colgroup>

            <tbody className="border-t border-solid border-black">
              {places.map((place, idx) => 
                <tr key={place.name + idx} className="border-b border-solid border-ccc">
                  <th className="p-4 whitespace-nowrap font-medium bg-gray-100">{place.name}</th>
                  <td className="p-4 whitespace-nowrap font-light">{place.address}</td>
                  <td className="p-4 whitespace-nowrap font-light">{place.telephone}</td>
              </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
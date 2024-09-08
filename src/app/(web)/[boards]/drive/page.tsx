import AddBoard from '../../../../components/drive/AddBoard';

export default function drive({ params }: { params: { boards: string } }) {
  let title = '';
  if ('qna' === params.boards) {
    title = 'QnA 신청';
  } else {
    title = '전시시승 신청';
  }

  return (
    <main id="drivePage" className="min-w-80 py-32 px-40 bg-white">
      <div className="drive">
        <div className="text-center py-4">
          <h2 className="pb-8 text-5xl font-medium text-black">{title}</h2>
        </div>
        <AddBoard isMain={false} params={{ boards: params.boards }} />

        <div className="text-center py-4">
          <h2 className="pb-12 text-5xl font-medium text-black">제니시수연 플레이스</h2>
        </div>
        <section className="mb-20">
          <table className="border-collapse w-full table-fixed">
            <colgroup>
              <col className="w-[30%]" />
              <col className="w-[45%]" />
              <col className="w-[25%]" />
            </colgroup>

            <tbody className="border-t border-solid border-black">
              <tr className="border-b border-solid border-ccc">
                <th className="p-4 whitespace-nowrap font-medium bg-gray-100">제니시수연 강남</th>

                <td className="p-4 whitespace-nowrap font-light">서울시 강남구 영동대로 410</td>
                <td className="p-4 whitespace-nowrap font-light">02-556-9870</td>
              </tr>
              <tr className="border-b border-solid border-ccc">
                <th className="p-4 whitespace-nowrap font-medium bg-gray-100">제니시수연 수지</th>

                <td className="p-4 whitespace-nowrap font-light">경기도 용인시 풍덕천동 860</td>
                <td className="p-4 whitespace-nowrap font-light">1522-8830</td>
              </tr>
              <tr className="border-b border-solid border-ccc">
                <th className="p-4 whitespace-nowrap font-medium bg-gray-100">
                  제니시수연 스튜디오 하남
                </th>
                <td className="p-4 whitespace-nowrap font-light">
                  경기도 하남시 미사대로 750번지 스타필드 하남 2층
                </td>
                <td className="p-4 whitespace-nowrap font-light">031-8072-8381</td>
              </tr>
              <tr className="border-b border-solid border-ccc">
                <th className="p-4 whitespace-nowrap font-medium bg-gray-100">
                  제니시수연 스튜디오 안성
                </th>
                <td className="p-4 whitespace-nowrap font-light">
                  경기도 안성시 공도읍 서동대로 3930-39 스타필드 안성 2F 제니시수연 안성
                </td>
                <td className="p-4 whitespace-nowrap font-light">031-8092-1601</td>
              </tr>
              <tr className="border-b border-solid border-ccc">
                <th className="p-4 whitespace-nowrap font-medium bg-gray-100">
                  제니시수연 스튜디오 서울
                </th>
                <td className="p-4 whitespace-nowrap font-light">서울 강남 언주로 738</td>
                <td className="p-4 whitespace-nowrap font-light">1899-6611</td>
              </tr>
              <tr className="border-b border-solid border-ccc">
                <th className="p-4 whitespace-nowrap font-medium bg-gray-100">
                  제니시수연 스튜디오 고양
                </th>
                <td className="p-4 whitespace-nowrap font-light">
                  경기도 고양시 일산서구 킨텍스로 217-6
                </td>
                <td className="p-4 whitespace-nowrap font-light">1899-6611</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}

import Submit from '@/components/Submit';
import { updatePost } from '@/data/actions/postAction';
import { Metadata } from 'next';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { boards: string; id: string } }): Metadata {
  const boardName = params.boards;
  return {
    title: `${boardName} - 게시글 수정`,
    description: `${boardName} - 게시글을 수정하세요.`,
    openGraph: {
      title: `${boardName} - 게시글 수정`,
      description: `${boardName} - 게시글을 수정하세요.`,
      url: `/${params.boards}/${params.id}/editDrive`,
    },
  };
}

export default function Page({ params }: { params: { boards: string; id: string } }) {
  return (
    <main className="min-w-80 py-32 px-40 bg-white dark:bg-white">
      <div className="drive">
        <div className="text-center py-4">
          <h2 className="pb-8 text-5xl font-medium text-black dark:text-black">시승신청 수정</h2>
        </div>
        <section className="mb-24 p-4">
          <form action={updatePost}>
            <input type="hidden" name="boardName" value={params.boards} />
            <div className="flex gap-16">
              <div className="flex-1 my-4 mb-10">
                <label className="block text-xl mb-2" htmlFor="name">
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="성함을 남겨주세요"
                  className="w-full p-5 border dark:border-gray-300 border-gray-300  dark:bg-gray-100"
                  name="name"
                />
              </div>

              <div className="flex-1 my-4 mb-10">
                <label className="block text-xl mb-2" htmlFor="phone">
                  PHONE
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="연락처를 남겨주세요"
                  className="w-full p-5 border dark:border-gray-300 border-gray-300  dark:bg-gray-100"
                  name="phone"
                />
              </div>
            </div>

            <div className="flex gap-16">
              <div className="flex-1 my-4 mb-10">
                <label className="block text-xl mb-2" htmlFor="model">
                  MODEL
                </label>

                <select
                  id="title"
                  name="title"
                  className="w-full p-5 border dark:border-gray-300 border-gray-300 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:bg-gray-100"
                  defaultValue="model"
                >
                  <option value="model" disabled hidden>
                    시승체험을 원하는 모델을 선택해주세요
                  </option>
                  <option value="G90 BLACK">G90 BLACK</option>
                  <option value="G90 Long Wheel Base">G90 Long Wheel Base</option>
                  <option value="G90">G90</option>
                  <option value="G80">G80</option>
                  <option value="G80 Electrrified">G80 Electrrified</option>
                  <option value="G70">G70</option>
                  <option value="G70 Shooting Brake">G70 Shooting Brake</option>
                  <option value="GV80">GV80</option>
                  <option value="GV80 COUPE">GV80 COUPE</option>
                  <option value="GV70">GV70</option>
                  <option value="GV70 Electrified">GV70 Electrified</option>
                  <option value="GV60">GV60</option>
                  <option value="NEOLUN Concept">NEOLUN Concept</option>
                </select>
              </div>

              <div className="flex-1 my-4 mb-10">
                <label className="block text-xl mb-2" htmlFor="address">
                  ADDRESS
                </label>

                <select
                  id="address"
                  name="address"
                  className="w-full p-5 border dark:border-gray-300 border-gray-300 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:bg-gray-100"
                  defaultValue="address"
                >
                  <option value="address" disabled hidden>
                    가까운 전시장을 찾아 선택해주세요
                  </option>
                  <option value="재니시수연 강남">재니시수연 강남</option>
                  <option value="재니시수연 수지">재니시수연 수지</option>
                  <option value="재니시수연 스튜디오 하남">재니시수연 스튜디오 하남</option>
                  <option value="재니시수연 스튜디오 안성">재니시수연 스튜디오 안성</option>
                  <option value="재니시수연 스튜디오 서울">재니시수연 스튜디오 서울</option>
                  <option value="재니시수연 스튜디오 고양">재니시수연 스튜디오 고양</option>
                </select>
              </div>
            </div>

            <label className="block text-xl mt-4 mb-2" htmlFor="content">
              DETAILS
            </label>
            <textarea
              id="content"
              rows={15}
              placeholder="원하는 상담내용을 입력해주세요"
              className="w-full p-5 resize-none border border-gray-300 bg-gray-50  dark:bg-gray-100 dark:text-black"
              name="content"
            ></textarea>

            <div className="flex justify-end my-6">
              <Submit>수정</Submit>
              <Link
                href={`/${params.boards}/${params.id}`}
                className="bg-black py-1 px-4 text-base text-white font-semibold ml-2"
              >
                취소
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default function SkeletonList({ listCount }: { listCount: number }) {
  const list = new Array(listCount)
    .fill(0)
    .map((_, i) => <div key={`list_${i}`} className="w-full h-[41px] bg-[#ddd] skeletonUI"></div>);
  return (
    <>
      {/* 게시물 목록 테이블 스켈레톤 */}
      <section className="pt-10 pb-[6px] px-[300px] max-[1366px]:px-0">
        <div className="flex flex-col gap-y-[5px] ">
          <div className="grid sm:grid-cols-[1fr_10%_8%_8%_12%] gap-x-[5px] h-[41px] grid-cols-[1fr_20%] ">
            <div className="bg-[#ddd] skeletonUI"></div>
            <div className="bg-[#ddd] skeletonUI"></div>
            <div className="bg-[#ddd] sm:block hidden skeletonUI"></div>
            <div className="bg-[#ddd] sm:block hidden skeletonUI"></div>
            <div className="bg-[#ddd] sm:block hidden skeletonUI"></div>
          </div>

          <div className="flex flex-col gap-y-[5.1px]">{list}</div>

          <div className="mt-4 w-[30%] h-[24px] bg-[#ddd] m-[0_auto] skeletonUI"></div>
        </div>
      </section>
    </>
  );
}

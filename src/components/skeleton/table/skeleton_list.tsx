export default function SkeletonList({ listCount }: { listCount: number }) {
  const list = new Array(listCount)
    .fill(0)
    .map((_, i) => <div key={`list_${i}`} className="w-full h-[40px] bg-[#ddd]"></div>);
  return (
    <>
      {/* 상단 검색바 스켈레톤 */}
      <div className="w-full flex justify-between px-[300px] h-[45px] max-[1080px]:flex-col max-[1080px]:w-full max-[1080px]:h-max max-[1080px]:gap-y-[10px] max-[1080px]:px-[7%]">
        <div className="w-full max-w-[137px] h-[45px] bg-[#ddd]"></div>
        <div className="w-[390px] h-[45px] bg-[#ddd]"></div>
      </div>

      {/* 테이블 스켈레톤 */}
      <section className="pt-10 px-[300px] max-[1366px]:px-0">
        <div className="flex flex-col gap-y-[5px]">
          <div className="grid sm:grid-cols-[1fr_10%_8%_8%_12%] gap-x-[5px] h-[40px] grid-cols-[1fr_20%]">
            <div className="bg-[#ddd]"></div>
            <div className="bg-[#ddd]"></div>
            <div className="bg-[#ddd] sm:block hidden"></div>
            <div className="bg-[#ddd] sm:block hidden"></div>
            <div className="bg-[#ddd] sm:block hidden"></div>
          </div>
          <div className="flex flex-col gap-y-[5px]">{list}</div>
        </div>

        <hr />
        <div className="mt-4 w-[30%] h-[24px] bg-[#ddd] m-[0_auto]"></div>
      </section>
    </>
  );
}

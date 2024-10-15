export default function MobilePriceLayout ({mobilePrice}:{mobilePrice:number}) {
  return (
    <>
      <aside className="hidden sticky bottom-[60px] z-10 bg-black border-[1px] border-[#666] max-[1366px]:flex flex-row pl-0 py-[10px]
                  items-center justify-center gap-x-[20px] mx-[7%] text-xl">
        <p className="text-[#a4a4a4]">예상 가격</p>
        <span className="font-bold font-Hyundai-sans">
          {mobilePrice.toLocaleString('ko-KR')}
          <span className="align-middle"> 원</span>
        </span>
      </aside>
    </>
  )
}
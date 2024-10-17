export default function MobilePriceLayout ({mobilePrice}:{mobilePrice:number}) {
  return (
    <>
      <aside className="hidden max-[1366px]:flex sticky z-10 bg-black border-[1px] border-[#666] py-[10px]
                  items-center justify-center gap-x-[20px] mx-0 max-[950px]:mx-[7%] text-xl max-[1366px]:bottom-0 max-[950px]:bottom-[60px]">
        <p className="text-[#a4a4a4]">예상 가격</p>
        <span className="font-bold font-Hyundai-sans">
          {mobilePrice.toLocaleString('ko-KR')}
          <span className="align-middle"> 원</span>
        </span>
      </aside>
    </>
  )
}
import Image from 'next/image';
import { ReactElement } from 'react';
import ButtonReset from './ButtonReset';

export default function ButtonOption({
  model,
  price,
  clickHandler,
}: {
  model: string;
  price: number;
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>, direction?: string) => void;
}): ReactElement {
  return (
    <div className="grid grid-cols-[60px_60px] grid-rows-[50px_140px] gap-x-[20px] gap-y-[19px] absolute top-[620px] left-[80px] max-[1366px]:hidden">
      <button
        className="bg-black border-[0.5px] border-white w-full h-full"
        onClick={(e) => clickHandler(e, 'prev')}
      >
        <figure className="relative w-full h-[75%]">
          <Image
            className="absolute top-0 left-0"
            fill
            sizes="100%"
            src="/images/btn_prev.png"
            alt="버튼 좌측 이미지"
            style={{ objectFit: 'contain' }}
          />
        </figure>
      </button>
      <button className="bg-white w-full h-full" onClick={clickHandler}>
        <figure className="relative w-full h-[75%]">
          <Image
            className="absolute top-0 left-0"
            fill
            sizes="100%"
            src="/images/btn_next_b.png"
            alt="버튼 좌측 이미지"
            style={{ objectFit: 'contain' }}
          />
        </figure>
      </button>
      <ButtonReset model={model} price={price} />
    </div>
  );
}

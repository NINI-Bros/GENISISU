import Submit from '@/components/Submit';
import { signInWithGenesis, signInWithHyundai } from '@/data/actions/userAction';
import Image from 'next/image';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSnsIcons } from './snsIconJson';
import { TargetArea } from '@/components/Spinner';

export default function JoinSnsButton() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const getIcons = getSnsIcons();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if (code && state) {
      const login = async () => {
        if (state.startsWith('GENESIS')) {
          await signInWithGenesis(code);
        } else if (state.startsWith('HYUNDAI')) {
          await signInWithHyundai(code);
        }
      };
      login();
    }
  }, [router, searchParams]);

  const snsList = () => {
    return getIcons.map((item) => (
      <Submit
        className="snsWrap relative border-none hover:underline cursor:pointer"
        onClick={item.type === 'hyundai-sns' ? item.onclick : undefined}
        formAction={item.type === 'hyundai-sns' ? undefined : item.action}
        key={item.name}
      >
        <article className="relative aspect-[1/1] w-[30px] ">
          <Image
            src={item.image}
            fill
            sizes="100%"
            className="grayscale hover:grayscale-0 hover:scale-105 absolute top-0 left-0 object-contain transition-all"
            alt={item.alt}
          ></Image>
        </article>
        <div className="snsToolTips">
          <span>{item.alt}</span>
        </div>
      </Submit>
    ));
  };

  return (
    <Suspense fallback={<TargetArea />}>
      <div className="flex gap-x-[10px] justify-between items-center px-[5%]">{snsList()}</div>
    </Suspense>
  );
}

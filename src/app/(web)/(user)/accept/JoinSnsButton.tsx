import Submit from '@/components/Submit';
import {
  fetchGenesisAuth,
  fetchHyundaiAuth,
  signInWithGenesis,
  signInWithGithub,
  signInWithGoogle,
  signInWithHyundai,
  signInWithKakao,
  signInWithNaver,
} from '@/data/actions/userAction';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function JoinSnsButton() {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const handleSignInGenesis = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetchGenesisAuth();
  };

  const handleSignInHyundai = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetchHyundaiAuth();
  };
  const snsIcons = [
    {
      name: 'google',
      alt: '구글 로그인',
      image: '/images/sns_icon/google.png',
      action: signInWithGoogle,
      type: 'basic_sns',
    },
    {
      name: 'github',
      alt: '깃허브 로그인',
      image: '/images/sns_icon/Github.png',
      action: signInWithGithub,
      type: 'basic_sns',
    },
    {
      name: 'genesis',
      alt: '제네시스 로그인',
      image: '/images/sns_icon/genesis.png',
      onclick: handleSignInGenesis,
      type: 'hyundai-sns',
    },
    {
      name: 'hyundai',
      alt: '현대 로그인',
      image: '/images/sns_icon/hyundai.png',
      onclick: handleSignInHyundai,
      type: 'hyundai-sns',
    },
    {
      name: 'naver',
      alt: '네이버 로그인',
      image: '/images/sns_icon/naver.png',
      action: signInWithNaver,
      type: 'basic_sns',
    },
    {
      name: 'kakao',
      alt: '카카오 로그인',
      image: '/images/sns_icon/Kakaotalk.png',
      action: signInWithKakao,
      type: 'basic_sns',
    },
  ];

  const snsList = () => {
    return snsIcons.map((item) => {
      if (item.type === 'hyundai-sns') {
        return (
          <Submit
            className="snsWrap relative border-none hover:underline cursor:pointer"
            onClick={item.onclick}
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
        );
      } else {
        return (
          <Submit
            className="snsWrap relative border-none hover:underline cursor:pointer"
            formAction={item.action}
            key={item.name}
          >
            <article className=" relative aspect-[1/1] w-[30px]">
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
        );
      }
    });
  };

  return <div className="flex gap-x-[10px] justify-between items-center px-[5%]">{snsList()}</div>;
}

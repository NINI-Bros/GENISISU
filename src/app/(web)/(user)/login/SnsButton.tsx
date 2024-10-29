'use client';

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
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from '@/hook/useSession';

export default function SnsButton() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { session, status } = useSession();
  // console.log(status, 'session: ', session);

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

  return (
    <div className="flex flex-wrap gap-x-[10px] gap-y-[10px] justify-center items-center">
      <Submit
        className="w-1/5 btnBasic px-[4%] py-[1%] hover:underline cursor:pointer"
        formAction={signInWithGoogle}
      >
        구글
      </Submit>
      <Submit
        className="w-1/5 btnBasic px-[4%] py-[1%] hover:underline cursor:pointer"
        formAction={signInWithGithub}
      >
        깃허브
      </Submit>
      <Submit
        className="w-1/5 btnBasic px-[4%] py-[1%] hover:underline cursor:pointer"
        formAction={signInWithNaver}
      >
        네이버
      </Submit>
      <Submit
        className="w-1/5 btnBasic px-[4%] py-[1%] hover:underline cursor:pointer"
        formAction={signInWithKakao}
      >
        카카오
      </Submit>
      <Submit
        className="flex-grow-0 flex-shrink-0 basis-1/3 btnBasic px-[4%] py-[1%] hover:underline cursor:pointer"
        // formAction={handleFormSubmit}
        onClick={handleSignInGenesis}
      >
        제네시스
      </Submit>
      <Submit
        className="flex-grow-0 flex-shrink-0 basis-1/3 btnBasic px-[5%] py-[1%] hover:underline cursor:pointer"
        onClick={handleSignInHyundai}
      >
        현대멤버스
      </Submit>
    </div>
  );
}

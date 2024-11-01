import {
  fetchGenesisAuth,
  fetchHyundaiAuth,
  signInWithGithub,
  signInWithGoogle,
  signInWithKakao,
  signInWithNaver,
} from '@/data/actions/userAction';

export function getSnsIcons() {
  const handleSignInGenesis = async (e) => {
    e.preventDefault();
    await fetchGenesisAuth();
  };

  const handleSignInHyundai = async (e) => {
    e.preventDefault();
    await fetchHyundaiAuth();
  };
  return [
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
}

import Submit from '@/components/Submit';
import {
  signInWithGenesis,
  signInWithGithub,
  signInWithGoogle,
  signInWithHyundai,
  signInWithKakao,
  signInWithNaver,
} from '@/data/actions/userAction';
import Image from 'next/image';

export default function JoinSnsButton() {
  const snsIcons = [
    {
      name: 'google',
      alt: '구글 로그인 아이콘',
      image: '/images/sns_icon/google.png',
      action: signInWithGoogle,
    },
    {
      name: 'github',
      alt: '깃허브 로그인 아이콘',
      image: '/images/sns_icon/Github.png',
      action: signInWithGithub,
    },
    {
      name: 'naver',
      alt: '네이버 로그인 아이콘',
      image: '/images/sns_icon/naver.png',
      action: signInWithNaver,
    },
    {
      name: 'kakao',
      alt: '카카오 로그인 아이콘',
      image: '/images/sns_icon/Kakaotalk.png',
      action: signInWithKakao,
    },
  ];

  const handleMouseEnter = () => {
    console.log('마우스 들어옴');
  };
  return (
    <div className="flex gap-x-[10px] justify-between items-center">
      {snsIcons.map((item) => (
        <Submit
          className="border-none px-[5%] hover:underline cursor:pointer"
          formAction={item.action}
          key={item.name}
        >
          <article className="relative aspect-[1/1] w-[30px]">
            <Image
              src={item.image}
              fill
              sizes="100%"
              className="grayscale hover:grayscale-0 hover:scale-105 absolute top-0 left-0 object-contain transition-all"
              alt={item.alt}
            ></Image>
          </article>
        </Submit>
      ))}

      {/* <Submit
    //     className="btnBasic px-[5%] py-[1%] hover:underline cursor:pointer"
    //     formAction={signInWithHyundai}
    //   >
    //     현대멤버스
    //   </Submit>
    //   <Submit
    //     className="btnBasic px-[5%] py-[1%] hover:underline cursor:pointer"
    //     formAction={signInWithGenesis}
    //   >
    //     제네시스
    //   </Submit> */}
    </div>
  );
}

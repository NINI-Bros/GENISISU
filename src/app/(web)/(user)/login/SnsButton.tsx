import Submit from '@/components/Submit';
import {
  signInWithGenesis,
  signInWithGithub,
  signInWithGoogle,
  signInWithHyundai,
  signInWithKakao,
  signInWithNaver,
} from '@/data/actions/userAction';

export default function SnsButton() {
  return (
    <div className="flex gap-x-[10px] justify-between items-center">
      <Submit
        className="btnBasic px-[5%] py-[1%] hover:underline cursor:pointer"
        formAction={signInWithGoogle}
      >
        구글
      </Submit>
      <Submit
        className="btnBasic px-[5%] py-[1%] hover:underline cursor:pointer"
        formAction={signInWithGithub}
      >
        깃허브
      </Submit>
      <Submit
        className="btnBasic px-[5%] py-[1%] hover:underline cursor:pointer"
        formAction={signInWithNaver}
      >
        네이버
      </Submit>
      <Submit
        className="btnBasic px-[5%] py-[1%] hover:underline cursor:pointer"
        formAction={signInWithKakao}
      >
        카카오
      </Submit>
      {/* <Submit
        className="btnBasic px-[5%] py-[1%] hover:underline cursor:pointer"
        formAction={signInWithHyundai}
      >
        현대멤버스
      </Submit>
      <Submit
        className="btnBasic px-[5%] py-[1%] hover:underline cursor:pointer"
        formAction={signInWithGenesis}
      >
        제네시스
      </Submit> */}
    </div>
  );
}

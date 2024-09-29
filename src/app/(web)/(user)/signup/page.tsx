import { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: '회원 가입 - 멋사컴',
  openGraph: {
    title: '회원 가입 - 멋사컴',
    description: '무료 회원 가입후 멋사컴의 모든 서비스를 이용하세요.',
    url: '/user/signup'
  }
}

  
export default function Page() {
  return (
    <main className="min-w-80 flex-grow flex items-center justify-center bg-white">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md my-[40px]">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 max-[1366px]:text-[34px]">회원 가입</h2>
        </div>

        <SignupForm />
        
      </div>
    </main>
  );
}
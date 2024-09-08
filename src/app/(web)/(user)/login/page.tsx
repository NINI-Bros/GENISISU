import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: '로그인 - 멋사컴',
  openGraph: {
    title: '로그인 - 멋사컴',
    description: '로그인 페이지',
    url: '/user/login'
  }
}
  
export default function Page() {
  return (
    <main className="min-w-80 flex-grow flex items-center justify-center bg-white">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md my-[50px]">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">로그인</h2>
        </div>

        <LoginForm />

      </div>
    </main>
  );
}
import Submit from '@/components/Submit';
import { Metadata } from 'next';
import Link from 'next/link';
import CommentList from './CommentList';
import { fetchPost } from '@/data/fetch/postFetch';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';

export async function generateMetadata({
  params,
}: {
  params: { boards: string; id: string };
}): Promise<Metadata> {
  const boardName = params.boards;
  const item = await fetchPost(params.id);
  if (item === null) notFound();
  return {
    title: `${boardName} - ${item.title}`,
    description: `${boardName} - ${item.content}`,
    openGraph: {
      title: `${boardName} - ${item.title}`,
      description: `${boardName} - ${item.content}`,
      url: `/${params.boards}/${params.id}`,
    },
  };
}

export async function generateStaticParams() {
  return [
    { boards: 'notice', id: '4' },
    { boards: 'notice', id: '5' },
  ];
}

export default async function Page({ params }: { params: { boards: string; id: string } }) {
  // const item = await model.post.detail(Number(params.id));
  const session = await auth();
  const item = await fetchPost(params.id);
  if (item === null) notFound();

  let car = '';
  if ('info' === params.boards) {
    car = '시승신청 차량 : ';
  } else {
    car = '';
  }

  let person = '';
  if ('info' === params.boards) {
    person = '신청자 : ';
  } else {
    person = '작성자 : ';
  }

  let place = '';
  if ('info' === params.boards) {
    place = '희망 플레이스 : ';
  } else {
    place = '';
  }

  return (
    <main className="bg-white dark:bg-white px-40 py-20">
      <section className="mb-8 p-4">
        <form action={`/${params.boards}`}>
          <div className="font-medium text-2xl mb-12">
            {car}
            {item.title}
          </div>
          <div className="text-black text-lg mb-2 font-medium">
            {person}
            {item.extra?.name}
          </div>
          <div className="text-black text-lg mb-2 font-light">연락처 : {item.phone}</div>
          <div className="text-black text-lg mb-12 font-light">
            {place}
            {item.address}
          </div>
          <div className="text-black text-lg mb-20 font-light"> {item.content}</div>

          <div className="flex justify-end my-4">
            <Link
              href={`/${params.boards}`}
              className="bg-black py-1 px-4 text-base text-white ml-2"
            >
              목록
            </Link>
            {session?.user?.id === String(item.user?._id) && (
              <>
                <Link
                  href={`/${params.boards}/${params.id}/editDrive`}
                  className="py-1 px-4 mr-2 text-base text-black border-gray-600 border ml-2"
                >
                  수정
                </Link>
                <Submit bgColor="black">삭제</Submit>
              </>
            )}
          </div>
        </form>
      </section>

      <CommentList params={params} />
    </main>
  );
}

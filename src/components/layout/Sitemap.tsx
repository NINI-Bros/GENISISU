'use client';

import { fetchVehicles } from '@/data/fetch/productFetch';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useModalOpenBgFix from '@/hook/useModalOpenBgFix';
import { useModalStateStore } from '@/zustand/useModalState';

export default function Sitemap() {
  const modelRef = useRef(null);
  const modalState = useModalStateStore((state) => state.modalState);
  const modalSelectFn = useModalStateStore((state) => state.setModalSelectState);
  const path = usePathname();

  // 모달호출 시 배경 고정 커스텀 훅
  useModalOpenBgFix(modalState);

  // 모델이름 불러오기 위한 서버액션
  const [titdata, setTitData] = useState<String[]>([]);
  useEffect(() => {
    const vehicleData = async () => {
      try {
        const originData = await fetchVehicles();
        const nameData = originData.map((item) => item.name.split('-').join(' ').toUpperCase());
        setTitData(nameData);
      } catch (err) {
        console.error(err);
      }
    };
    vehicleData();
  }, []);

  // 화면이동시마다 클래스값 제거
  useEffect(() => {
    modalSelectFn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  // 모델명 컴포넌트
  const MenuList = () => {
    return (
      <>
        {titdata.map((item, i) =>
          item !== 'NEOLUN CONCEPT' ? (
            <Link key={'model_' + (i + 1)} href={'/models/' + (i + 1)}>
              {item}
            </Link>
          ) : (
            <Link
              key={'model_' + 13}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('준비중입니다');
              }}
            >
              {item}
            </Link>
          )
        )}
      </>
    );
  };

  return (
    <div className={['sitemapModal', 'modal', modalState ? 'on' : ''].join(' ')} ref={modelRef}>
      <section>
        <h2>SITE MAP</h2>

        <div className="siteItemWrap">
          <article>
            <h3>모델</h3>
            <div>
              <MenuList />
            </div>
          </article>

          <article>
            <h3>게시판</h3>
            <div>
              <Link href="/drive">전시시승</Link>
              <Link href="/qna">고객지원</Link>
              <Link href="/info">공지사항</Link>
              <Link href="/drive/new">전시시승 신청</Link>
            </div>
          </article>

          <article>
            <h3>제니시수</h3>
            <div>
              <Link href="https://github.com/redcontroller">김모건</Link>
              <Link href="https://github.com/sylee0102">이수연</Link>
              <Link href="https://github.com/ryungom">류재준</Link>
            </div>
          </article>
        </div>
      </section>

      <div className="closeBtn" onClick={() => modalSelectFn(false)}>
        <div className="cl-line"></div>
        <div className="cl-line"></div>
      </div>
    </div>
  );
}

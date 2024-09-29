'use client';

export default function Event3() {
  return (
    <section id="event3">
      <article>
        <h2>
          GENISISU <span>EVENTS</span>
        </h2>
        <h3>제니시수에서 진행중인 다양한 이벤트를 소개합니다.</h3>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            alert('준비중 입니다.');
          }}
          className="mainBtn"
        >
          VIEW MORE
        </button>
      </article>
    </section>
  );
}

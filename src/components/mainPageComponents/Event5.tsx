import AddBoard from '../drive/AddBoard';
export default function Event5({ boardName }: { boardName: string }) {
  return (
    <section id="event5">
      <div className="ev5_wrap">
        <h2>시승신청</h2>
        <AddBoard params={{ boards: boardName }} isMain={true} />
      </div>
      <div className="bgImg"></div>
    </section>
  );
}

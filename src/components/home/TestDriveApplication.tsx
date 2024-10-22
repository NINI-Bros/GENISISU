import AddBoard from '../drive/AddBoard';

export default function TestDriveApplication({ boardName }: { boardName: string }) {
  return (
    <section id="event5">
      <div className="ev5_wrap">
        <h2 className="mb-20 max-[1366px]:mb-5">시승신청</h2>
        <AddBoard params={{ boards: boardName }} isMain={true} />
      </div>
      <div className="bgImg"></div>
    </section>
  );
}

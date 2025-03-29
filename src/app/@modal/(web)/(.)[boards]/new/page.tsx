import DetailPage from '@/app/(web)/[boards]/new/page';
import BoardModal from '@/components/BoardModal';

export default function Page({ params }: { params: { boards: string; id: string } }) {
  return (
    <BoardModal>
      <DetailPage params={params} />
    </BoardModal>
  );
}

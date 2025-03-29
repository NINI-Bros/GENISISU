import DetailPage from '@/app/(web)/[boards]/[id]/page';
import BoardModal from '@/components/BoardModal';

export default function Page({ params }: { params: { boards: string; id: string } }) {
  return (
    <BoardModal>
      <DetailPage params={params} />
    </BoardModal>
  );
}

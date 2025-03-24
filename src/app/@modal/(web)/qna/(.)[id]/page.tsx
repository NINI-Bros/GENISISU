import DetailPage from '@/app/(web)/[boards]/[id]/page';
import BoardModal from '@/components/BoardModal';

export default function Page(props: any) {
  return (
    <BoardModal>
      <DetailPage {...props} />
    </BoardModal>
  );
}

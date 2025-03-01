import DetailPage from '@/app/(web)/[boards]/[id]/page';
import BasicModal from '@/components/BasicModal';

export default function Page(props: any) {
  return (
    <BasicModal>
      <DetailPage {...props} />
    </BasicModal>
  );
}

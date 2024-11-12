import { Post } from '@/types';

export default function FoldingText({
  fetchPostData,
  viewType,
}: {
  fetchPostData: Post;
  viewType: 'list' | 'detail';
}) {
  let bbsType;
  switch (fetchPostData.extra?.contentType) {
    case 'event':
      bbsType = '이벤트';
      break;
    case 'award':
      bbsType = '수상';
      break;
    default:
      return null;
  }
  return (
    <>
      {viewType === 'list' ? (
        <span className="bg-black text-white py-1 px-3 mr-3">{bbsType}</span>
      ) : (
        <span className="py-1 px-3 mr-3">{`[ ${bbsType} ]`}</span>
      )}
    </>
  );
}

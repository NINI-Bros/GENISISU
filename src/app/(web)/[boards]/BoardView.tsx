'use client';
import { BoardTitle, Pagination, Post } from '@/types';
import PostPagination from '@/components/PostPagination';
import ListItem from './ListItem';

export default function BoardView({
  boardTypes,
  postData,
  postNameData,
  paginationData,
}: {
  boardTypes: string;
  postData: Post[];
  postNameData: BoardTitle;
  paginationData: Pagination;
}) {
  const { tableTitle, tableAuthor, tableDate } = postNameData;
  const postAllData = () => {
    return postData.map((item) => <ListItem key={item._id} item={item} boardTypes={boardTypes} />);
  };

  return (
    <>
      {postAllData().length !== 0 ? (
        <section className="pt-10 px-[300px] max-[1366px]:px-0">
          <table className="border-collapse w-full table-fixed">
            <colgroup>
              <col className="w-[80%] sm:w-auto" />
              <col className="w-[20%] sm:w-[10%]" />
              <col className="w-0 sm:w-[8%]" />
              <col className="w-0 sm:w-[8%]" />
              <col className="w-0 sm:w-[12%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-solid border-gray-600">
                <th className="p-2 ml-20 whitespace-nowrap font-medium max-[640px]:px-[7%]">
                  {tableTitle}
                </th>
                <th className="p-2 whitespace-nowrap font-medium max-[640px]:pl-0 max-[640px]:pr-[7%] max-[640px]:text-left">
                  {tableAuthor}
                </th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">조회수</th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">댓글수</th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">
                  {tableDate}
                </th>
              </tr>
            </thead>
            <tbody>{postAllData()}</tbody>
          </table>
          {/* <hr /> */}
          <PostPagination pagingData={paginationData} boardType={boardTypes} />
        </section>
      ) : (
        <section className="pt-10 flex justify-center items-center text-[#999] text-xl px-[300px] max-[1366px]:px-0">
          게시물이 존재하지 않습니다.
        </section>
      )}
    </>
  );
}

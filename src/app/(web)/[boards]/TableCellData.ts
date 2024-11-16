import { BoardTitle } from '@/types';

export default function TableCellData(boardType: string) {
  // 게시판분기에 따른 제목 및 Table Header값 설정
  let dataArr: BoardTitle = {
    mainTitle: '',
    tableTitle: '제목',
    tableAuthor: '작성자',
    tableDate: '작성일',
    submitBtnName: '',
  };
  switch (boardType) {
    case 'qna':
      dataArr.mainTitle = '고객지원';
      dataArr.submitBtnName = '문의하기';
      break;
    case 'info':
      dataArr.mainTitle = '공지사항';
      dataArr.submitBtnName = '작성하기';
      break;
    default: // drive 이기도 함.
      dataArr.mainTitle = '전시시승';
      dataArr.tableTitle = '시승신청 모델';
      dataArr.tableAuthor = '신청자';
      dataArr.tableDate = '시승 신청일';
      dataArr.submitBtnName = '신청하기';
  }
  return dataArr;
}

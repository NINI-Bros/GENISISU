import { create } from 'zustand';
import {
  faHouseChimney,
  faCar,
  faRightToBracket,
  faHeadphones,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

interface GnbStore {
  gnb: {
    route: string;
    text: string;
    icon: IconDefinition;
    device: string[];
  }[];
}

export const useGnbStore = create<GnbStore>((set) => ({
  gnb: [
    {
      route: '',
      text: '홈',
      icon: faHouseChimney,
      device: ['mobile'],
    },
    {
      route: 'models',
      text: '모델',
      icon: faCar,
      device: ['web', 'mobile'],
    },
    {
      route: 'drive',
      text: '전시시승',
      icon: faRightToBracket,
      device: ['web', 'mobile'],
    },
    {
      route: 'qna',
      text: '고객지원',
      icon: faHeadphones,
      device: ['web', 'mobile'],
    },
    {
      route: 'info',
      text: '공지사항',
      icon: faFileLines,
      device: ['web', 'mobile'],
    },
    {
      route: 'none',
      text: '제니시수',
      icon: faFileLines,
      device: ['web'],
    },
  ],
}));

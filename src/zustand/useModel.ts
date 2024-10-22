import { OptionList } from '@/types/optionLayout';
import { create } from 'zustand';

interface ModelStore {
  items: string[];
  steps: string[];
  places: {
    name: string;
    address: string;
    telephone: string;
  }[];
  optionList: OptionList;
  updateItems: (newItems: ModelStore['items']) => void;
  updateSteps: (newStems: ModelStore['steps']) => void;
  updatePlaces: (newPlaces: ModelStore['places']) => void;
}

export const useModelStore = create<ModelStore>((set) => ({
  items: [
    'g90-black',
    'g90-long-wheel-base',
    'g90',
    'g80',
    'electrified-g80',
    'g70',
    'g70-shooting-brake',
    'gv80',
    'gv80-coupe',
    'gv70',
    'electrified-gv70',
    'gv60',
    'neolun-concept',
  ],
  updateItems: (newItems: ModelStore['items']) => set({ items: newItems }),
  steps: [
    'detail',
    'engine',
    'drivetrain',
    'passenger',
    'exterior',
    'interior',
    'garnish',
    'wheel',
    'add',
    'payments',
  ],
  updateSteps: (newSteps: ModelStore['steps']) => set({ steps: newSteps }),
  places: [
    {
      name: '제니시수 강남',
      address: '서울시 강남구 영동대로 410',
      telephone: '02-556-9870',
    },
    {
      name: '제니시수 수지',
      address: '경기도 용인시 풍덕천동 860',
      telephone: '1522-8830',
    },
    {
      name: '제니시수 스튜디오 하남',
      address: '경기도 하남시 미사대로 750번지 스타필드 하남 2층',
      telephone: '031-8072-8381',
    },
    {
      name: '제니시수 스튜디오 안성',
      address: '경기도 안성시 공도읍 서동대로 3930-39 스타필드 안성 2F 제니시수 안성',
      telephone: '031-8092-1601',
    },
    {
      name: '제니시수 모터스튜디오 서울',
      address: '서울 강남 언주로 738',
      telephone: '1899-6611',
    },
    {
      name: '제니시수 모터스튜디오 고양',
      address: '경기도 고양시 일산서구 킨텍스로 217-6',
      telephone: '1899-6611',
    },
  ],
  updatePlaces: (newPlaces: ModelStore['places']) => set({ places: newPlaces }),
  optionList: {
    detail: '모델 상세',
    engine: '엔진 타입',
    drivetrain: '구동 타입',
    passenger: '시트 구성',
    exterior: '외장 컬러',
    interior: '내장디자인 & 컬러',
    garnish: '내장가니쉬',
    wheel: '휠 & 타이어',
    add: '선택 품목',
    payments: '결제',
  },
}));

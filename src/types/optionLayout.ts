import { Option, Product } from '@/types/product';


export interface VerticalLayoutProps {
  params: {
    model: string;
    option: string;
  };
  modelData: Product | null;
  optionData: Option[];
}

export interface OptionList {
  [key: string]: string;
}

export interface HorizontalLayoutProps {
  params: {
    model: string;
    option: string;
  };
  modelData: Product | null;
  optionData: Option[];
}

export interface OptionEventParams {
  optionGroup: string;
  optionItem: string;
  optionImage: string;
  optionText: string;
  optionPrice: number;
}

export interface ColorLayoutProps {
  params: {
    model: string;
    option: string;
  };
  modelData: Product | null;
  optionData: Option[];
}
import { Option, OptionItem, Product, Subject } from '@/types/product';

export interface LayoutProps {
  params: {
    model: string;
    option: string;
  };
  modelData: Product;
  optionData: Option[];
}

export interface OptionList {
  [key: string]: string;
}

export interface OptionEventParams {
  optionGroup: string;
  optionItem: string;
  optionImage: string;
  optionText: string;
  optionPrice: number;
}

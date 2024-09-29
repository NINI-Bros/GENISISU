import { OptionItem } from '@/types/product';
import ModelColor from '../ModelColor';

interface Section3Color {
  optionData: OptionItem[];
}

export default function Section3Color({ optionData }: Section3Color) {
  return <ModelColor exterior={optionData} />;
}

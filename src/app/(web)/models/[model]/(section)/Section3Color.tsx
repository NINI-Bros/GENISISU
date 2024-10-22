import { OptionItem } from '@/types/product';
import ModelColor from '../ModelColor';

export default function Section3Color({ optionData }: { optionData: OptionItem[] }) {
  return <ModelColor exterior={optionData} />;
}

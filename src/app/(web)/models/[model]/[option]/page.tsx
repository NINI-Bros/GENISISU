import { fetchOption, fetchProduct } from '@/data/fetch/productFetch';
import dynamic from 'next/dynamic';
import { ComponentType, ReactElement } from 'react';
import { LayoutProps } from '@/types/optionLayout';
import { notFound } from 'next/navigation';

const horizontalArray = ['add'];
const colorArray = ['interior', 'garnish', 'exterior'];
const verticalArray = ['engine', 'drivetrain', 'passenger', 'wheel'];

export default async function OptionPage({
  params,
}: {
  params: { model: string; option: string };
}): Promise<ReactElement> {
  const modelData = await fetchProduct(params.model);
  if (!modelData || Number(params.model) > 13) {
    notFound();
  }
  const optionData = (await fetchOption(params.option)) || [];

  let NoSSRComponent: ComponentType<LayoutProps> | null = null;
  if (verticalArray.includes(params.option)) {
    NoSSRComponent = dynamic(() => import('./(layout)/VerticalLayout'), {
      ssr: false,
    });
  } else if (colorArray.includes(params.option)) {
    NoSSRComponent = dynamic(() => import('./(layout)/ColorLayout'), {
      ssr: false,
    });
  } else if (horizontalArray.includes(params.option)) {
    NoSSRComponent = dynamic(() => import('./(layout)/HorizontalLayout'), {
      ssr: false,
    });
  } else {
    notFound();
  }

  return (
    <>
      {NoSSRComponent && (
        <NoSSRComponent params={params} modelData={modelData} optionData={optionData} />
      )}
    </>
  );
}

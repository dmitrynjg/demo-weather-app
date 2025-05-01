import { DetailPage } from '@/pages/detaill/page';
import { notFound } from 'next/navigation';
import { FC } from 'react';

const Detail: FC<{ params: { lat?: string; lon?: string } }> = async ({
  params,
}) => {
  if (!Number(params?.lat) || !Number(params?.lon)) {
    notFound();
  }

  return (
    <DetailPage
      lat={Number(params?.lat)}
      lon={Number(params?.lon)}
    />
  );
};

export default Detail;

import DetailPage from '@/app/pages/detaill';
import { notFound } from 'next/navigation';

const Detail = async ({ params }: { params: Promise<{ lat: string; lon: string }> }) => {
  const lat = (await params).lat;
  const lon = (await params).lon;

  if (!Number(lat) || !Number(lon)) {
    notFound();
  }

  return (
    <DetailPage
      lat={Number(lat)}
      lon={Number(lon)}
    />
  );
};

export default Detail;

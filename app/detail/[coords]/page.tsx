'use client';

import { Button } from '@/shared';
import { WeatherWidgetWithGraph } from '@/widgets';
import { usePathname, useRouter } from 'next/navigation';

const DetailPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split('/');

  const slug = segments[2];

  const [lat, lon] = slug?.split('&').map(Number);

  const handleBack = () => {
    router.push('/');
  };

  if (!lat || !lon) {
    return <div>Ничего не найдено</div>;
  }

  return (
    <main className='relative container mx-auto p-4 max flex justify-center md:items-center md:h-screen py-20'>
      <div className='max-w-3xl w-full'>
        <div className='relative'>
          <div className='absolute top-[-50px]'>
            <Button onClick={handleBack}>На главную</Button>
          </div>
          <WeatherWidgetWithGraph
            lat={lat}
            lon={lon}
            isFull
          />
        </div>
      </div>
    </main>
  );
}

export default DetailPage;

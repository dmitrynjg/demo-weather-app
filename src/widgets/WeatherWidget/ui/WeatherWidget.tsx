'use client';
import { WeatherCard } from '@/entities/Weather/ui/WeatherCard';
import { useGetForecast } from '@/shared/api/query/useGetForecast';
import { FC, useState, useMemo, useEffect } from 'react';
import styles from './WeatherWidget.module.scss';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export interface WeatherWidgetProps {
  lat: number;
  lon: number;
  isLike?: boolean;
  onDelete?: VoidFunction;
  onLike?: VoidFunction;
  isFull?: boolean;
}

export const WeatherWidget: FC<WeatherWidgetProps> = ({ lat, lon, isFull, isLike, onLike, onDelete }) => {
  const [day, setDay] = useState(1);

  const cnt = useMemo(() => {
    return day * 8 + 1;
  }, [day]);

  const { data, isLoading, refetch } = useGetForecast({
    lat,
    lon,
    cnt,
  });

  const { first, list } = useMemo(() => {
    return {
      first: data?.list?.length ? data?.list[0] : null,
      list: data?.list?.slice(0, data?.list.length) || [],
    };
  }, [data]);

  useEffect(() => {
    if (day) {
      refetch();
    }
  }, [day, refetch]);

  const router = useRouter();

  const openDetail = () => {
    router.push(`/detail/${lat}/${lon}`);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div>
      {first && (
        <WeatherCard
          {...first}
          title={data?.city || ''}
          isFull={isFull}
          onOpenCard={openDetail}
          isLike={isLike}
          onDelete={onDelete}
          onLike={onLike}
        />
      )}
      {isFull && (
        <div className='mt-4'>
          <div className='w-100 btn-group mb-4'>
            {[1, 2, 3, 4, 5].map((dayNumber) => (
              <Button
                key={dayNumber}
                disabled={dayNumber === day}
                size='sm'
                onClick={() => setDay(dayNumber)}
              >
                {dayNumber}d
              </Button>
            ))}
          </div>
          <div className={styles.list}>
            {list.map((item, index) => (
              <WeatherCard
                key={index}
                {...item}
                isSmall
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import { WeatherData } from '@/shared/types';
import Image from 'next/image';
import { FC } from 'react';
import styles from './WeatherCard.module.scss';
import { IconBag, IconFullScreen, IconHeart } from '@/shared/ui/icons';

export interface WeatherCardProps extends WeatherData {
  title?: string;
  isSmall?: boolean;
  isFull?: boolean;
  isLike?: boolean;
  onOpenCard?: VoidFunction;
  onLike?: VoidFunction;
  onDelete?: VoidFunction;
}

export const WeatherCard: FC<WeatherCardProps> = ({
  dateTitle,
  temp,
  feelsLike,
  windSpeed,
  pressure,
  humidity,
  icon,
  title,
  isSmall,
  isFull,
  isLike,
  onDelete,
  onLike,
  onOpenCard,
}) => {
  return (
    <div className='w-100'>
      <div className='card text-body'>
        <div className='card-body p-4'>
          <div className='d-flex'>
            <div className='flex-grow-1'>
              {title && <h3>{title}</h3>}
              <span className='small'>{dateTitle}</span>
            </div>

            {!isSmall && (
              <div className='d-flex gap-3'>
                <span
                  className={styles.iconContainer}
                  onClick={isLike ? onDelete : onLike}
                >
                  {isLike ? (
                    <IconBag />
                  ) : (
                    <IconHeart />
                  )}
                </span>

                {!isFull && (
                  <span
                    className={styles.iconContainer}
                    onClick={onOpenCard}
                  >
                    <IconFullScreen />
                  </span>
                )}
              </div>
            )}
          </div>

          <div className='d-flex flex-column text-center mt-5 mb-4'>
            <h6
              className={`${
                isSmall ? 'small' : 'display-4'
              } mb-0 font-weight-bold`}
            >
              {' '}
              {temp}°C
            </h6>
            <span className='small'>Ошущается как {feelsLike}°C</span>
          </div>

          <div className='d-flex align-items-center'>
            <div className={`flex-grow-1 ${isSmall && 'small'}`}>
              <div>
                <span className='ms-1'>Ветер {windSpeed} м/c</span>
              </div>
              <div>
                <span className='ms-1'>Давление {pressure} hPa</span>
              </div>
              <div>
                <span className='ms-1'>Влажность {humidity}%</span>
              </div>
            </div>
            <div>
              {!isSmall && (
                <Image
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  width={100}
                  height={100}
                  alt={dateTitle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

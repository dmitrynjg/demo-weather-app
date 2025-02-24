import { FC } from 'react';
import { WeatherCardProps } from '../model';
import Image from 'next/image';

export const WeatherCard: FC<WeatherCardProps> = ({
  date,
  temp,
  icon,
  pressure,
  feelsLike,
  humidity,
  windSpeed,
}) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-full'>
      <div className='flex justify-between items-start'>
        <div>
          <h4 className='text-lg font-bold'>{date}</h4>
          <p className='text-gray-500'>{temp}°C</p>
        </div>

        <Image
          src={icon}
          alt='Weather icon'
          className='w-16 h-16'
          width={200}
          height={200}
        />
      </div>

      <div className='mt-2'>
        <p className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
          Ощущается как: {feelsLike}°C
        </p>
        <p className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
          Давление: {pressure} hPa
        </p>
        <p className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
          Влажность: {humidity}%
        </p>
        <p className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
          Скорость ветра: {windSpeed} м/с
        </p>
      </div>
    </div>
  );
};

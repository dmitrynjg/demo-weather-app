import { memo, FC, useMemo, useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Skeleton,
  Tabs,
  TabsList,
  TabsTrigger,
  IconBag,
  IconFullScreen,
  CardFooter,
  ScrollArea,
  ScrollBar,
} from '@/shared';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  TooltipProps,
} from 'recharts';
import { WeatherWidgetWithGraphProps } from '@/widgets/weather/model';
import { useGetForecastQuery, WeatherCard, WeatherCardProps } from '@/entities';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

import { motion } from 'framer-motion';
import { mapperWeatherDataForChart } from '@/widgets/weather/lib';
import { useRouter } from 'next/navigation';

const CustomTooltip: FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
}) => {
  const info = useMemo<WeatherCardProps | null>(() => {
    const data = payload?.[0]?.payload;
    return data
      ? {
          ...data,
          date: data.name,
          icon: `https://openweathermap.org/img/wn/${data.icon}@2x.png`,
        }
      : null;
  }, [payload]);

  return active && payload && info ? <WeatherCard {...info} /> : null;
};

export const WeatherWidgetWithGraph: FC<WeatherWidgetWithGraphProps> = memo(
  ({ lat, lon, onDelete, isShowButton, isFull }) => {
    const [day, setDay] = useState(1);
    const router = useRouter();
    const cnt = useMemo(() => {
      return day * 8 + 1;
    }, [day]);

    const { data, isLoading, refetch } = useGetForecastQuery({
      lat,
      lon,
      cnt,
    });

    const chartData = useMemo(() => {
      return data?.list ? mapperWeatherDataForChart(data?.list) : [];
    }, [data]);

    const onOpenDetail = useCallback(() => {
      router.push(`/detail/${lat}-${lon}`);
    }, [router, lat, lon]);

    useEffect(() => {
      if (cnt) {
        refetch();
      }
    }, [cnt, refetch]);

    return (
      <Card className='h-full flex flex-col'>
        <CardHeader>
          <div className='w-full flex justify-between items-center'>
            <CardTitle className='md:text-2xl text-3xl'>{data?.city}</CardTitle>

            {isShowButton && (
              <div className='flex gap-[15px]'>
                <motion.span
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.4 },
                    cursor: 'pointer',
                  }}
                  whileTap={{ scale: 0.9 }}
                  className='text-red-500 md:w-5 w-7'
                  onClick={onDelete}
                >
                  <IconBag />
                </motion.span>

                <motion.span
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.4 },
                    cursor: 'pointer',
                  }}
                  whileTap={{ scale: 0.9 }}
                  className='md:w-5 w-7'
                  onClick={onOpenDetail}
                >
                  <IconFullScreen />
                </motion.span>
              </div>
            )}
          </div>

          <Tabs
            defaultValue='1d'
            className='w-full py-2'
          >
            <TabsList className='w-full'>
              <TabsTrigger
                value='1d'
                className='w-full'
                onClick={() => setDay(1)}
              >
                1d
              </TabsTrigger>
              <TabsTrigger
                value='2d'
                className='w-full'
                onClick={() => setDay(2)}
              >
                2d
              </TabsTrigger>
              <TabsTrigger
                value='3d'
                className='w-full'
                onClick={() => setDay(3)}
              >
                3d
              </TabsTrigger>
              <TabsTrigger
                value='4d'
                className='w-full'
                onClick={() => setDay(4)}
              >
                4d
              </TabsTrigger>
              <TabsTrigger
                value='5d'
                className='w-full'
                onClick={() => setDay(5)}
              >
                5d
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className='h-64 p-1 margin-auto'>
          {isLoading ? (
            <Skeleton className='h-full' />
          ) : (
            <ResponsiveContainer
              width='100%'
              height='100%'
            >
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Line
                  dot={false}
                  dataKey='temp'
                  name='Температура'
                  stroke='#8884d8'
                />
                <Line
                  dot={false}
                  dataKey='feelsLike'
                  name='Ощущается как'
                  stroke='#82ca9d'
                />
                <Line
                  dot={false}
                  dataKey='windSpeed'
                  name='Скорость ветра'
                  stroke='green'
                />
                <Legend />
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>

        {isFull && (
          <CardFooter className='py-5'>
            <ScrollArea className='w-full whitespace-nowrap rounded-md'>
              <div className='flex w-max space-x-4 p-4'>
                {chartData.map((item) => (
                  <WeatherCard
                    key={item.name}
                    date={item.name}
                    temp={item.temp}
                    icon={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                    pressure={item.pressure}
                    feelsLike={item.feelsLike}
                    humidity={item.humidity}
                    windSpeed={item.windSpeed}
                  />
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </CardFooter>
        )}
      </Card>
    );
  }
);

WeatherWidgetWithGraph.displayName = 'WeatherCard';

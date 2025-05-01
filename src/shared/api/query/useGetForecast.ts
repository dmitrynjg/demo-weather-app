import { useQuery } from '@tanstack/react-query';
import { ForecastParams } from '@/shared/types';
import { openWeatherApi } from '../openweather';

// Хук для прогноза погоды
export const useGetForecast = (params: ForecastParams) => {
  return useQuery({
    queryKey: ['forecast', params.lat, params.lon],
    queryFn: async () => {
      return openWeatherApi.getForecast(params);
    },
    enabled: !!params.lat && !!params.lon,
  });
};
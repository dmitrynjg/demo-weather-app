import { useQuery } from '@tanstack/react-query';
import { GeoCodeItem } from '@/shared/types';
import { openWeatherApi } from '../openweather';

export const useGetGeocode = (params: { city: string; limit?: number }) => {
  return useQuery<GeoCodeItem[], Error>({
    queryKey: ['geocode', params.city],
    queryFn: async () => {
      const data = openWeatherApi.geoCode(params.city);
      return data;
    },
    enabled: !!params.city,
  });
};

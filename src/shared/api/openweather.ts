import axios from 'axios';
import { GeoCodeItemResponse, WeatherDataResponse, ForecastParams } from '../types';
import { mapperGeoCode, mapperWeatherData } from '../lib';

export const openWeatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/',
  params: {
    appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
    units: 'metric',
    lang: 'ru',
  },
});

openWeatherClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data?.message || 'Ошибка сети');
  }
);

export const openWeatherApi = {
  async geoCode(city: string, limit?: number) {
    const { data } = await openWeatherClient.get<GeoCodeItemResponse[]>(
      '/geo/1.0/direct',
      {
        params: {
          q: city,
          limit: limit ?? 5,
        },
      }
    );
    return mapperGeoCode(data);
  },

  async getForecast(params: ForecastParams) {
    const { data } = await openWeatherClient.get<WeatherDataResponse>('/data/2.5/forecast', {
      params: {
        lat: params.lat,
        lon: params.lon,
        cnt: params.cnt,
        units: 'metric',
        lang: 'ru'
      }
    });

    return {
      city: data.city.name,
      list: mapperWeatherData(data.list)
    };
  }
};


import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ForceastRequest,
  GetGeoCodeItem,
  GetWeatherDataResponse,
  WeatherData,
} from "../model";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/",
  }),
  endpoints: (builder) => ({
    getGeocode: builder.query({
      query: (params: { limit?: number; city: string }) => ({
        url: `geo/1.0/direct`,
        params: {
          appid: String(process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY),
          units: "metric",
          limit: params.limit || 1,
          q: params.city,
          lang: "ru",
        },
      }),
      transformResponse: (
        response: (Omit<GetGeoCodeItem, "localNews"> & {
          local_news: GetGeoCodeItem["localNews"];
        })[]
      ) => {
        return response.map((data) => {
          const { local_news, ...otherData } = data;

          return {
            ...otherData,
            localNews: local_news,
          };
        });
      },
    }),
    getForecast: builder.query({
      query: ({ lat, lon, cnt }: ForceastRequest) => ({
        url: "data/2.5/forecast",
        params: {
          appid: String(process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY),
          lat,
          lon,
          lang: "ru",
          units: "metric",
          cnt,
        },
      }),
      transformResponse: (
        response: GetWeatherDataResponse
      ): { city: string; list: WeatherData[] } => ({
        city: response.city.name,
        list: response.list.map((item) => ({
          date: new Date(item.dt * 1000),
          temp: item.main.temp,
          feelsLike: item.main.feels_like,
          pressure: item.main.pressure,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          icon: item.weather?.[0].icon,
        })),
      }),
    }),
  }),
});

export const { useGetForecastQuery, useGetGeocodeQuery } = weatherApi;

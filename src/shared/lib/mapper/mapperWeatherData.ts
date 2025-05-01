import { WeatherData, WeatherDataResponse } from '@/shared/types';

export const mapperWeatherData = (
  items: WeatherDataResponse['list']
): WeatherData[] => {
  return items.map((dataItem) => {
    const date = new Date(dataItem.dt * 1000);
    const now = new Date();

    let displayDate = '';

    const hoursString = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (date.toDateString() === now.toDateString()) {
      displayDate = `Сегодня ${hoursString}`;
    } else if (
      date.toDateString() ===
      new Date(now.setDate(now.getDate() + 1)).toDateString()
    ) {
      displayDate = `Завтра ${hoursString}`;
    } else if (
      date.toDateString() ===
      new Date(now.setDate(now.getDate() + 2)).toDateString()
    ) {
      displayDate = `Послезавтра ${hoursString}`;
    } else {
      displayDate = `${date.toLocaleDateString()} ${hoursString}`;
    }

    return {
      dateTitle: displayDate,
      temp: dataItem.main.temp,
      feelsLike: dataItem.main.feels_like,
      pressure: dataItem.main.pressure,
      humidity: dataItem.main.humidity,
      windSpeed: dataItem.wind.speed,
      icon: dataItem.weather?.[0].icon,
    };
  });
};

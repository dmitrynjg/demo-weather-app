import { WeatherData } from '@/entities';

export const mapperWeatherDataForChart = (items: WeatherData[]) => {
  return items.map((dataItem) => {
    const date = new Date(dataItem.date);
    const now = new Date();

    let displayDate;

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
      name: displayDate,
      ...dataItem,
    };
  });
};

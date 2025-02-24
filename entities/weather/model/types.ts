export interface WeatherData {
  date: Date;
  temp: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface GetGeoCodeItem {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
  localNews: Record<string, string>;
}

export interface GetWeatherDataResponse {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherCardProps extends Omit<WeatherData, "date"> {
  date: string;
}

export interface ForceastRequest {
  lat: number;
  lon: number;
  isDaily?: boolean;
  cnt?: number;
}
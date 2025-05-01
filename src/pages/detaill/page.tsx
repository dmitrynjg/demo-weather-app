'use client';
import { useFavorites } from '@/shared/hooks/useFavorites';
import { MainNavbar } from '@/widgets/MainNavbar/ui/MainNavbar';
import { WeatherWidget } from '@/widgets/WeatherWidget/ui/WeatherWidget';
import { FC } from 'react';

export interface DetailPageProps {
  lat: number;
  lon: number;
}

export const DetailPage: FC<DetailPageProps> = ({ lat, lon }) => {
  const { favoritesByLatAndLon, addFavoriteCity, deleteFavoriteCity } =
    useFavorites();
    
  return (
    <div>
      <MainNavbar />

      <WeatherWidget
        lat={lat}
        lon={lon}
        isFull
        isLike={favoritesByLatAndLon[`${lat},${lon}`]}
        onLike={() => addFavoriteCity(lat, lon)}
        onDelete={() => deleteFavoriteCity(lat, lon)}
      />
    </div>
  );
};

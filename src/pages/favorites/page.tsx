'use client';
import { useFavorites } from '@/shared/hooks/useFavorites';
import { MainNavbar } from '@/widgets/MainNavbar/ui/MainNavbar';
import { WeatherWidget } from '@/widgets/WeatherWidget/ui/WeatherWidget';
import styles from './page.module.scss';

export const FavoritesPage = () => {
  const { favorites, deleteFavoriteCity } = useFavorites();

  return (
    <div>
      <MainNavbar />
      <div className={styles.list}> 
        {favorites.map((cityByCoords) => (
          <WeatherWidget
            key={`${cityByCoords.lat}-${cityByCoords.lon}`}
            lat={cityByCoords.lat}
            lon={cityByCoords.lon}
            isLike
            onDelete={() =>
              deleteFavoriteCity(cityByCoords.lat, cityByCoords.lon)
            }
          />
        ))}
      </div>
    </div>
  );
};
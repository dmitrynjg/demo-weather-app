'use client';
import { useFavorites } from '@/shared/hooks/useFavorites';
import { MainNavbar } from '@/widgets/MainNavbar/ui/MainNavbar';
import { WeatherWidget } from '@/widgets/WeatherWidget/ui/WeatherWidget';
import styles from './page.module.scss';

const FavoritesPage = () => {
  const { favorites, deleteFavoriteCity } = useFavorites();

  return (
    <div>
      <MainNavbar />
      <div className={styles.list}>
        {favorites.length === 0 && (
          <div className='d-flex justify-content-center align-items-center'>
            <div className='text-center'>
              <h3 className='text-muted'>Ничего не добавлено</h3>
              <p className='text-secondary mt-2'>Список пуст</p>
            </div>
          </div>
        )}
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

export default FavoritesPage;

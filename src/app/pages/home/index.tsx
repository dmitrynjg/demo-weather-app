'use client';
import { MainNavbar } from '@/widgets/MainNavbar/ui/MainNavbar';
import { useCity } from '@/shared/hooks/useCity';
import { WeatherWidget } from '@/widgets/WeatherWidget/ui/WeatherWidget';
import { useFavorites } from '@/shared/hooks/useFavorites';

const HomePage = () => {
  const { city } = useCity();

  const { favoritesByLatAndLon, addFavoriteCity, deleteFavoriteCity } = useFavorites();

  return (
    <div>
      <MainNavbar />

      {city ? (
        <WeatherWidget
          lat={city.lat}
          lon={city.lon}
          isLike={favoritesByLatAndLon[`${city.lat},${city.lon}`]}
          onLike={() => addFavoriteCity(city.lat, city.lon)}
          onDelete={() => deleteFavoriteCity(city.lat, city.lon)}
        />
      ) : (
        <span>ничего не найдено</span>
      )}
    </div>
  );
};

export default HomePage;
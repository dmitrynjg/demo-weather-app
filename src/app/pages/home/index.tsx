'use client';
import { MainNavbar } from '@/widgets/MainNavbar/ui/MainNavbar';
import { useCity } from '@/shared/hooks/useCity';
import { WeatherWidget } from '@/widgets/WeatherWidget/ui/WeatherWidget';
import { useFavorites } from '@/shared/hooks/useFavorites';

const HomePage = () => {
  const { city } = useCity();
  const { favoritesByLatAndLon, addFavoriteCity, deleteFavoriteCity } = useFavorites();

  return (
    <div className="min-vh-100">
      <MainNavbar />

      {city ? (
        <div className="container mt-4">
          <WeatherWidget
            lat={city.lat}
            lon={city.lon}
            isLike={favoritesByLatAndLon[`${city.lat},${city.lon}`]}
            onLike={() => addFavoriteCity(city.lat, city.lon)}
            onDelete={() => deleteFavoriteCity(city.lat, city.lon)}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h2 className="text-muted">Ничего не выбрано</h2>
            <p className="text-secondary mt-2">Найдите город в поиске</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
import { useMemo } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FavoriteStore {
  favorites: { lat: number; lon: number }[];
  addFavoriteCity: (lat: number, lon: number) => void;
  deleteFavoriteCity: (lat: number, lon: number) => void;
}

export const useFavoritesStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavoriteCity: (lat, lon) => {
        set((state) => ({
          favorites: [...state.favorites, { lat, lon }],
        }));
      },
      deleteFavoriteCity: (lat, lon) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (favoriteCity) =>
              favoriteCity.lat !== lat || favoriteCity.lon !== lon
          ),
        }));
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useFavorites = () => {
  const { favorites, addFavoriteCity, deleteFavoriteCity } =
    useFavoritesStore();

  const favoritesByLatAndLon = useMemo(() => {
    const objectByLatAndLon: Record<string, true> = {};
    favorites.forEach((city) => {
      objectByLatAndLon[`${city.lat},${city.lon}`] = true;
    });
    return objectByLatAndLon;
  }, [favorites]);

  return {
    favorites,
    favoritesByLatAndLon,
    addFavoriteCity,
    deleteFavoriteCity,
  };
};

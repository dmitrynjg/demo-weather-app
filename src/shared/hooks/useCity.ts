import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GeoCodeItem } from '../types';

export interface CityStore {
  city: GeoCodeItem | null;
  searchCityText: string;
  setSearchCityText: (text: string) => void;
  setCity: (city: GeoCodeItem) => void;
}

export const useCity = create<CityStore>()(
  persist(
    (set) => ({
      searchCityText: '',
      city: null,
      setSearchCityText: (text: string) => {
        set((state) => ({
          searchCityText: typeof text === 'string' ? text : state.searchCityText,
        }));
      },
      setCity: (city: GeoCodeItem) => {
        set(() => ({
          city: city,
        }));
      },
    }),
    {
      name: 'city-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

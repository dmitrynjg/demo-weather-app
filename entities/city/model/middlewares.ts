import { Middleware } from "@reduxjs/toolkit";
import { addCity, deleteCityByIndex } from "./slices";
import { GetGeoCodeItem } from "@/entities/weather";
import { isPayloadAction } from "@/shared";

export const saveCityMiddleware: Middleware = () => (next) => (action) => {
  // Проверка на наличие window
  if (typeof window !== 'undefined' && window.localStorage) {
    const currentCities: GetGeoCodeItem[] = JSON.parse(localStorage.getItem("cities") || "[]");

    if (isPayloadAction<GetGeoCodeItem>(action) && action.type === addCity.type) {
      const city = action.payload;
      localStorage.setItem("cities", JSON.stringify([...currentCities, city]));
    }
    
    if (
      isPayloadAction<number>(action) &&
      action.type === deleteCityByIndex.type
    ) {
      const deleteIndex = action.payload;
      const newCitiesList = currentCities.filter((_, index) => index !== deleteIndex);
      localStorage.setItem("cities", JSON.stringify(newCitiesList));
    }
  }

  return next(action);
};

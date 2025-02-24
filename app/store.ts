import { configureStore } from '@reduxjs/toolkit';

import { citiesReducer, saveCityMiddleware, weatherApi } from '@/entities';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    cities: citiesReducer,
  },

  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    })
      .concat(weatherApi.middleware)
      .concat(saveCityMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GetGeoCodeItem } from "@/entities/weather/model";

const initialState: {
  list: GetGeoCodeItem[];
} = {
  list: JSON.parse(localStorage.getItem("cities") || "[]"),
};

export const fetchCitiesFromStorage = createAsyncThunk(
  "cities/fetchCitiesFromStorage",
  async () => {
    return JSON.parse(localStorage.getItem("cities") || "[]");
  }
);

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<GetGeoCodeItem>) => {
      state.list.push(action.payload);
    },
    deleteCityByIndex: (state, action: PayloadAction<number>) => {
      const deleteIndex = action.payload;
      state.list = state.list.filter((_, index) => index !== deleteIndex);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCitiesFromStorage.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { addCity, deleteCityByIndex } = citiesSlice.actions;
export const citiesReducer = citiesSlice.reducer;

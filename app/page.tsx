'use client';

import {
  useGetGeocodeQuery,
  GetGeoCodeItem,
  addCity,
  deleteCityByIndex,
} from '@/entities';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WeatherWidgetWithGraph } from '@/widgets';
import { Search } from '@/features';

const HomePage = () => {
  const [cityText, setCityText] = useState('');

  const {
    data: searchCities,
    isLoading: isLoadingCities,
    refetch: refetchCities,
  } = useGetGeocodeQuery({
    city: cityText,
    limit: 10,
  });

  const dispatch = useDispatch();

  const listCities = useSelector<RootState, RootState['cities']['list']>(
    (state) => state.cities.list
  );

  useEffect(() => {
    if (cityText.length > 3) {
      refetchCities();
    }
  }, [cityText, refetchCities]);

  const handleSearch = useCallback(
    async (city: string) => {
      setCityText(city);
    },
    [setCityText]
  );

  const onAddCity = useCallback(
    (item: GetGeoCodeItem) => {
      if (
        listCities.find(
          (city) => city.lat === item.lat && city.lon === item.lon
        )
      ) {
        alert('Город уже есть в списке');
        return;
      }
      dispatch(addCity(item));
    },
    [dispatch, listCities]
  );

  const results = useMemo(() => {
    return (
      searchCities?.map((data) => ({
        label: `${data.name}, ${data.country}`,
        value: data,
      })) || []
    );
  }, [searchCities]);

  return (
    <main className='container mx-auto p-4'>
      <Search
        onSearch={handleSearch}
        isLoading={isLoadingCities}
        onClickSearchItem={onAddCity}
        results={results}
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-6'>
        {listCities.length === 0 ? (
          <div className='col-span-1 md:col-span-3 flex justify-center items-center h-64 border border-dashed border-gray-300 rounded-lg'>
            <p className='text-gray-600 text-lg text-center'>
              Список городов пуст
            </p>
          </div>
        ) : (
          listCities.map((city, index) => (
            <WeatherWidgetWithGraph
              key={`${index}-${city.lat}-${city.lon}`}
              lat={city.lat}
              lon={city.lon}
              onDelete={() => dispatch(deleteCityByIndex(index))}
              isShowButton
            />
          ))
        )}
      </div>
    </main>
  );
}

export default HomePage;

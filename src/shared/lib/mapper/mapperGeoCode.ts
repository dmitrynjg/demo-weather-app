import { GeoCodeItem, GeoCodeItemResponse } from '@/shared/types';

export const mapperGeoCode = (items: GeoCodeItemResponse[]): GeoCodeItem[] =>
  items.map(({ local_names, ...otherData }) => ({
    ...otherData,
    localNames: local_names,
  }));

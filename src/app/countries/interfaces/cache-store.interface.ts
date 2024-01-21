import { Country } from './country';
import { ByCountryPageComponent } from '../pages/by-country-page/by-country-page.component';
import { Region } from './region.type';
export interface CacheStore {
  byCapital: searchWordCountries;
  byCountry: searchWordCountries;
  byRegion: regionCountries;
}

export interface searchWordCountries {
  searchWord: string;
  countries: Country[];
}

export interface regionCountries {
  region: Region;
  countries: Country[];
}

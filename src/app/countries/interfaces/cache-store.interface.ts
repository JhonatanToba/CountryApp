import { Country } from "./countries.interface"
import { Region } from "./region.type";

export interface CacheStore{
  capital:   TermCountries;
  name: TermCountries;
  region:    RegionCountry;
}

export interface TermCountries {
  term:      string;
  countries: Country[];
}

export interface RegionCountry {
  region?:    Region;
  countries: Country[];
}

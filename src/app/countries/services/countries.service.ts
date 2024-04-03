import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheStore, RegionCountry } from './../interfaces/cache-store.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/countries.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    capital: {
      term: '',
      countries: []
    },
    name: {
      term: '',
      countries: []
    },
    region: {
      region: '',
      countries: []
    }
  }


  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ) )
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem( 'cacheStore' )) {
      return
    }

    this.cacheStore = JSON.parse( localStorage.getItem( 'cacheStore' )! )
  }

  searchValue( term: string, by: keyof CacheStore ): Observable<Country[]> {
    const url = ` ${ this.apiURL }/${ by }/${ term }`;

    return this.http.get<Country[]>( url )
    .pipe(
      catchError( error => of([]) ),
      delay( 2000 ),
      tap( countries => {
        const cacheEntry = {
        term,
        countries
        };

        // Comprobación de tipo antes de asignar al cacheStore
        if (by === 'region') {
          const regionCacheEntry: RegionCountry = {
            region: term as Region,
            countries
          };
          this.cacheStore.region = regionCacheEntry;
        } else {
          this.cacheStore[by] = cacheEntry;
        }
      }),
      tap( () => this.saveToLocalStorage() )
    );
  }

  searchByAlphaCode( term: string ): Observable<Country | null> {
    const url = ` ${ this.apiURL }/alpha/${ term }`;

    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError( error => of(null) )
    );
  }

}

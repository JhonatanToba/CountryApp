import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/countries.interfaces';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchValue( term: string , by: string ): Observable<Country[]> {
    const url = ` ${ this.apiURL }/${ by }/${ term }`;

    return this.http.get<Country[]>( url )
    .pipe(
      catchError( error => of([]) )
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

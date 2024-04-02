import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/countries.interfaces';

@Injectable({providedIn: 'root'})
export class ServiceNameService {

  private apiURL: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCapital( term: string ): Observable<Country[]> {

    const url = ` ${ this.apiURL }/capital/${ term }`;

    return this.http.get<Country[]>( url );

  }

}
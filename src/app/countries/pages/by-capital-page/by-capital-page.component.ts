import { CacheStore } from './../../interfaces/cache-store.interface';
import { CountriesService } from './../../services/countries.service';
import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countriesService: CountriesService){

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.capital.countries;
    this.initialValue = this.countriesService.cacheStore.capital.term;
  }

  searchByCapital( term:string):void {

    this.isLoading = true;

    this.countriesService.searchValue( term, 'capital' ).subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    } );

  }
}

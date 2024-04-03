import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countriesService: CountriesService){

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.name.countries;
    this.initialValue = this.countriesService.cacheStore.name.term;
  }

  searchByCountry( term:string):void {

    this.countriesService.searchValue( term, 'name' ).subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    } );

  }
}

import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interfaces';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService){

  }

  searchByRegion( term:string ):void {

    this.countriesService.searchValue( term, 'region' ).subscribe( countries => {
      this.countries = countries;
    } );

  }
}

import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService){

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.region.countries;
    this.selectedRegion = this.countriesService.cacheStore.region.region;
    console.log(this.selectedRegion);

  }

  searchByRegion( term: Region ):void {

    this.selectedRegion = term;

    this.countriesService.searchValue( term, 'region' ).subscribe( countries => {
      this.countries = countries;
    } );

  }
}

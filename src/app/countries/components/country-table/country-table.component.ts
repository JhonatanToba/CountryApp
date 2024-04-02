import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: `
    img {
      width: 35px
    }
  `
})
export class CountryTableComponent {

  @Input()
  public countries: Country[] = [];
}

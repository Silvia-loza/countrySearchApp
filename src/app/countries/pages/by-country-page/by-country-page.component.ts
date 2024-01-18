import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent {
  public placeHolder: string = 'Buscar Pais...';

  public countryList: Country[] = [];

  constructor(private countriesService: CountriesService) {}
  SearchByCountry(searchWord: string): void {
    console.log('Desde ByCountryPageComponent');
    console.log({ searchWord });
    this.countriesService.searchByCountry(searchWord).subscribe((countries) => {
      this.countryList = countries;
      console.log({ countries });
    });
  }
}

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
  public isLoading: boolean = false;

  public countryList: Country[] = [];

  constructor(private countriesService: CountriesService) {}
  SearchByCountry(searchWord: string): void {
    this.isLoading = true;

    this.countriesService.searchByCountry(searchWord).subscribe((countries) => {
      this.countryList = countries;
      this.isLoading = false;
      console.log({ countries });
    });
  }
}

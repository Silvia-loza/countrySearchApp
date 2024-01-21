import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit {
  public placeHolder: string = '';
  public isLoading: boolean = false;

  public countryList: Country[] = [];

  constructor(private countriesService: CountriesService) {}
  ngOnInit(): void {
    this.countryList = this.countriesService.cacheStore.byCountry.countries;
    this.placeHolder = this.countriesService.cacheStore.byCountry.searchWord
      ? this.countriesService.cacheStore.byCountry.searchWord
      : 'Buscar País...';
  }
  SearchByCountry(searchWord: string): void {
    this.isLoading = true;

    this.countriesService.searchByCountry(searchWord).subscribe((countries) => {
      this.countryList = countries;
      this.isLoading = false;
      console.log({ countries });
    });
  }
}

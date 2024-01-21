import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country, CapitalInfo } from '../../interfaces/country';
import {
  CacheStore,
  searchWordCountries,
} from '../../interfaces/cache-store.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent implements OnInit {
  public placeHolder: string;
  public countryList: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {
    this.placeHolder = '';
  }
  ngOnInit(): void {
    this.countryList = this.countriesService.cacheStore.byCapital.countries;
    this.placeHolder = this.countriesService.cacheStore.byCapital.searchWord
      ? this.countriesService.cacheStore.byCapital.searchWord
      : 'Buscar Capital...';
  }

  SearchByCapital(searchWord: string): void {
    this.isLoading = true;
    this.countriesService.searchByCapital(searchWord).subscribe((countries) => {
      this.countryList = countries;
      this.isLoading = false;
    });
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country, CapitalInfo } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent {
  public placeHolder: string = 'Buscar Capital...';
  public countryList: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  SearchByCapital(searchWord: string): void {
    this.isLoading = true;
    this.countriesService.searchByCapital(searchWord).subscribe((countries) => {
      this.countryList = countries;
      this.isLoading = false;
    });
  }
}

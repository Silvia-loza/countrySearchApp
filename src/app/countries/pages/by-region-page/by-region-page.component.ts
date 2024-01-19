import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent {
  constructor(private countriesService: CountriesService) {}
  public placeHolder: string = 'Buscar Región...';
  public countryList: Country[] = [];
  public isLoading: boolean = false;

  SearchByRegion(searchWord: string): void {
    this.isLoading = true;

    this.countriesService.searchByRegion(searchWord).subscribe((countries) => {
      this.countryList = countries;
      this.isLoading = false;
    });
  }
}

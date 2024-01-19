import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
type Region = 'Americas' | 'Africa' | 'Asia' | 'Europe' | 'Oceania';
@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: `
  .btn {
    width: 100%;
  }
  .btn-outline-dark {
    border-color: #f699cd;
  }`,
})
export class ByRegionPageComponent {
  constructor(private countriesService: CountriesService) {}
  public placeHolder: string = 'Buscar Región...';
  public countryList: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = [
    'Americas',
    'Africa',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public selectedRegion?: Region;

  SearchByRegion(searchWord: Region): void {
    this.isLoading = true;
    this.selectedRegion = searchWord;

    this.countriesService.searchByRegion(searchWord).subscribe((countries) => {
      this.countryList = countries;
      this.isLoading = false;
    });
  }
}

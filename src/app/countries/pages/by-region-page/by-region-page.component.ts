import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

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
export class ByRegionPageComponent implements OnInit {
  constructor(private countriesService: CountriesService) {}

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
  ngOnInit(): void {
    this.countryList = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }
  SearchByRegion(searchWord: Region): void {
    this.isLoading = true;
    this.selectedRegion = searchWord;

    this.countriesService.searchByRegion(searchWord).subscribe((countries) => {
      this.countryList = countries;
      this.isLoading = false;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit {
  public country?: Country;
  public isLoading: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private CountriesService: CountriesService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.CountriesService.searchCountryByAlphaCode(id)
        )
      )
      .subscribe((country) => {
        console.log('country', country);
        this.isLoading = false;
        if (!country || country.length === 0) {
          return this.router.navigateByUrl('countries');
        }
        console.log({ country });
        return (this.country = country[0]);
      });
  }
}

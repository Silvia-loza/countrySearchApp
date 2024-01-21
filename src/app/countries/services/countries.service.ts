import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public countryList: Country[] = [];
  public cacheStore: CacheStore = {
    byCapital: { searchWord: '', countries: [] },
    byCountry: { searchWord: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }
  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')!) {
      return;
    }
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!); //  localStorage.setItem('cacheStore');
  }
  private getHttpRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  searchCountryByAlphaCode(country: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${country}`).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  searchByCapital(searchWord: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${searchWord}`;
    return this.getHttpRequest(url).pipe(
      tap((countries) => {
        this.cacheStore.byCapital = {
          searchWord: searchWord,
          countries: countries,
        };
        () => this.saveToLocalStorage();
      })
    );
  }

  searchByCountry(searchWord: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${searchWord}`;
    return this.getHttpRequest(url).pipe(
      tap((countries) => {
        this.cacheStore.byCountry = {
          searchWord,
          countries,
        };
        this.saveToLocalStorage();
      })
    );
  }

  searchByRegion(searchWord: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${searchWord}`;
    return this.getHttpRequest(url).pipe(
      tap((countries) => {
        this.cacheStore.byRegion = {
          region: searchWord,
          countries: countries,
        };
        this.saveToLocalStorage();
      })
    );
  }
}

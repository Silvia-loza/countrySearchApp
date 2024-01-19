import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  private getHttpRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  constructor(private http: HttpClient) {}

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
    return this.getHttpRequest(url);
  }

  searchByCountry(searchWord: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${searchWord}`;
    return this.getHttpRequest(url);
  }

  searchByRegion(searchWord: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${searchWord}`;
    return this.getHttpRequest(url);
  }
}

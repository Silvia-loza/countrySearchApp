import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  searchByCapital(searchWord: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/capital/${searchWord}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      );
  }

  searchByCountry(searchWord: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${searchWord}`).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  searchByRegion(searchWord: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${searchWord}`).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) { }

  // Defino la parte estatica de la Api
  private apiUrl: string = "https://restcountries.com/v3.1"

  // creo el metodo de busqueda. recibo q como término de busqueda
  // devuelvo un Observable, que va a ser una lista de la interface Country
  // el get devuelve un Object, pero le asigno que devuelva un Country (interface).
  // de este modo siempre devuelve la interface y no un Object, para poder definir los tipos de datos


  //*Aqui la funcion devuelve un arreglo, pero solo necesito devolver 1 solo valor
  // searchCountryByAlphaCode ( code: string): Observable<Country[]> {
  //   const urlRequest = `${this.apiUrl}/alpha/${code}`;
  //   return this.http.get<Country[]>(urlRequest)
  //     .pipe(
  //       catchError(error => of([]))
  //     )
  // }


  //* La funcion ahora devuelve Country o null
  searchCountryByAlphaCode ( code: string): Observable<Country | null > {
    const urlRequest = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(urlRequest)
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError(error => of(null))
      )
  }



  searchCapital(q: string): Observable<Country[]> {
    const urlRequest = `${this.apiUrl}/capital/${q}`;
    return this.http.get<Country[]>(urlRequest)
      .pipe(
        catchError(error => of([]))
      )
  }

  searchCountry(q: string): Observable<Country[]> {
    const urlRequest = `${this.apiUrl}/name/${q}`;
    return this.http.get<Country[]>(urlRequest)
      .pipe(
        catchError(error => of([]))
      )
  }

  searchRegion(region: string): Observable<Country[]> {
    const urlRequest = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(urlRequest)
      .pipe(
        catchError(error => of([]))
      )
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap , pipe } from 'rxjs';
import { Country } from '../interfaces/country';
import { cacheStored } from '../interfaces/cache-stored.interface';
import { Region } from '../interfaces/region.type';





@Injectable({ providedIn: 'root' })
export class CountriesService {

// Defino la parte estatica de la Api
  private apiUrl: string = "https://restcountries.com/v3.1";

// creo esto para hacer persistencia de datos cuando navego por la pagina
  public cacheStored: cacheStored = {
  byCapital: { term: '', countries:[] },
  byCountries: { term: '', countries:[] },
  byRegion: { region: '', countries:[] }
};

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
   }


  private saveToLocalStorage()  {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStored))
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore') ) return;

    this.cacheStored = JSON.parse(localStorage.getItem('cacheStore')!)
  }

  private getCountriesRequest (url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( () => of ([])   )
    );
  }

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

  searchCapital(term: string): Observable<Country[]> {
    const urlRequest = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest( urlRequest)
      .pipe(
        tap( countries => this.cacheStored.byCapital = {term, countries} ),
        tap( () => this.saveToLocalStorage() )
      )
  }

  searchCountry(term: string): Observable<Country[]> {
    const urlRequest = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest( urlRequest )
    .pipe(
      tap( countries => this.cacheStored.byCountries = {term, countries} ),
      tap( () => this.saveToLocalStorage() )
    )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const urlRequest = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest( urlRequest )
    .pipe(
      tap( countries => this.cacheStored.byRegion = {region, countries} ),
      tap( () => this.saveToLocalStorage() )
    )
  }

}

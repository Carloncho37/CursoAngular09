import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {
  constructor(private http: HttpClient) { }

  // Defino la parte estatica de la Api
  private apiUrl:string = "https://restcountries.com/v3.1"

// creo el metodo de busqueda. recibo q como término de busqueda
// devuelvo un Observable, que va a ser una lista de la interface Country
// el get devuelve un Object, pero le asigno que devuelva un Country (interface).
// de este modo siempre devuelve la interface y no un Object, para poder definir los tipos de datos


searchCapital ( q: string): Observable<Country[]> {
    const urlRequest = `${this.apiUrl}/capital/${q}`;
    return this.http.get<Country[]>( urlRequest )
    .pipe (
      catchError( error => of( [] ) )
    );
  }


}

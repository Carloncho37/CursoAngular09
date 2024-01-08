import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})

// creo el metodo que recibe un argumento y lo muestra por el log
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor ( private countriesService: CountriesService ) {};

  searchByCapital ( term: string):void {
    this.countriesService.searchCapital( term )
      .subscribe( countries=> {
        this.countries = countries;
      });

    console.log('desde byCapitalPage');
    console.log( {term} );
  }



}


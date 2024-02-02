import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})

// creo el metodo que recibe un argumento y lo muestra por el log
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) { };

  //! Implemento OnInit para cagar los datos que tenia guardados desde el servicio
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStored.byCapital.countries;
    this.initialValue =this.countriesService.cacheStored.byCapital.term;
  }

  searchByCapital(term: string): void {
    this.isLoading = true;

    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }



}


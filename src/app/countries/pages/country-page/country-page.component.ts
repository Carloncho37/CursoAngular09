import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
    ) {}


    //*Esto se puede desesctructurar en otra funcion mas, o se puede cambiar por el switchmap
    // ngOnInit(): void {
    // this.activatedRoute.params
    //   .subscribe(({ id }) => {
    //     this.countriesService.searchCountryByAlphaCode(id)
    //     .subscribe( country => {
    //       console.log ( { country }  )
    //     });
    //   }
    //   );


    ngOnInit(): void {
        this.activatedRoute.params
        .pipe(
          switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode(id)),
        )
        .subscribe (country => {
          if ( !country ) return this.router.navigateByUrl('');
          return this.country= country;
        });
    }

}

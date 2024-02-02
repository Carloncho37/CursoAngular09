import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-shearch-box',
  templateUrl: './shearch-box.component.html'
})
export class ShearchBoxComponent  implements  OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>;
  private debouncerSubscription?: Subscription;

  // Declaro propiedad para usarlar como parametro
  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  // creo la propiedad para usarla como event emitter, decorador @Output
  @Output()
  public onValue = new EventEmitter <string> ();

  @Output()
  public onDebounce = new EventEmitter <string> ();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(700)
    )
    .subscribe(value => {
        this.onDebounce.emit(value);
      }
    )
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  // creo otra propiedad, que esta si emite el valor.
  emitValue ( value: string ):void {
    this.onValue.emit( value )
  }

  onKeyPress( searchTerm: string){
    this.debouncer.next( searchTerm);
  }

}

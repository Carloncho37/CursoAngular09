import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-shearch-box',
  templateUrl: './shearch-box.component.html'
})
export class ShearchBoxComponent {

  // Declaro propiedad para usarlar como parametro
  @Input()
  public placeholder: string = '';

  // creo la propiedad para usarla como event emitter, decorador @Output
  @Output()
  public onValue = new EventEmitter <string> ();

  // creo otra propiedad, que esta si emite el valor.
  emitValue ( value: string ):void {
    this.onValue.emit( value )
  }

}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  // Con input recibimos datos
  @Input('nombre') leyenda: string = 'Hola mundo';
  @Input() progreso: number = 75;

  // para obtener elementos html
  @ViewChild('txtProgress') txtProgress: ElementRef;

  // Enviamos datos
  @Output('actualizarValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange(value: number) {
    if (value >= 100){
      this.progreso = 100;
    } else if (value <= 0){
      this.progreso = 0;
    } else {
      this.progreso = value;
    }

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.progreso = 100;
      this.cambioValor.emit(this.progreso);
      return;
    }

    if (this.progreso <= 0 && valor <= 0) {
      this.progreso = 0;
      this.cambioValor.emit(this.progreso);
      return;
    }

    this.progreso += valor;

    if (this.progreso > 100) {
      this.progreso = 100;
    }

    if (this.progreso < 0 ) {
      this.progreso = 0;
    }

    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  // implementa la interface
  ajustes: Ajustes = {
    tema: 'default'
  };

  constructor() {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarAjustes();
    } else {
      this.aplicarAjustes();
    }
  }

  aplicarAjustes() {
    document.getElementById('tema').setAttribute('href', `assets/css/colors/${this.ajustes.tema}.css`);
    this.guardarAjustes();
  }
}

// Interface para definir las propiedades
interface Ajustes {
  tema: string;
}

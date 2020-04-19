import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then((result) => {
      console.log('Fin promesa:', result);
    }).catch((err) => {
      console.error('Error de promesa', err);
    });
  }

  ngOnInit(): void {
  }

  // Funcion que devuelve una promesa
  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        let contador = 0;
        const intervalo = setInterval(() => {
          contador += 1;
          if (contador === 3) {
            resolve(true);
            clearInterval(intervalo);
          }
        }, 1000);
      } catch (error) {
        reject(false);
      }
    });
  }
}

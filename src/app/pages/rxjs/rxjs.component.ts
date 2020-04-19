import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() {

    // Pipe sirve para combinar mas funciones al observable
    this.subscription = this.creaObservable().pipe(retry(2)).subscribe(
      (data) => {
        console.log('Suscripcion: ', data); // Callback on emit
      },
      (err) => {
        console.error('Error en el observable: ', err); // callback on error
      },
      () => {
        console.log('Termina el observable'); // Callback on finish
      }
    ); // Subscribe recibe 3 callbacks para implementarlo correctamente
  }

  ngOnInit(): void {
  }

  // Se dispara cuando el usuario deja el componente
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  creaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      console.log('Inicia el obs');
      let contador = 0;

      const intervalo = setInterval(() => {
        contador++;
        const data = {
          valor: contador
        };
        observer.next(data); // Emite la informacion al suscriptor y el codigo continua no se detiene

        if (contador === 6) {
          clearInterval(intervalo);
          observer.complete(); // Se detiene el observable
        }

        // Para manejar los errores en el obrservable
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilio!'); // Error en el observable
        // }
      }, 1000);
    }).pipe(
      map((data) => {
        return data.valor;
      }),
      filter((data, index) => {
        if ((data % 2) === 0) {
          return true;
        } else {
          return false;
        }

      })
    );
  }
}

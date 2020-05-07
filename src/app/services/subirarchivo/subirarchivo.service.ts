import { Injectable } from '@angular/core';
import { URL_API } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class SubirarchivoService {
  constructor() {}

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo');
            reject(xhr.response);
          }
        }
      };

      const url = URL_API + `/upload/${tipo}/${id}`;

      xhr.open('PUT', url, true);

      xhr.send(formData);
    });
  }
}

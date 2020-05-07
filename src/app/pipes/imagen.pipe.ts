import { Pipe, PipeTransform } from '@angular/core';
import { URL_API } from '../config/config';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = 'usuario'): string {
    let url = URL_API + '/img';

    if (typeof img === 'undefined') {
      return (url += '/usuarios/xxx');
    }

    if (img.includes('https')) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'medico':
        url += '/medicos/' + img;
        break;

      case 'hospital':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('tipo de imagen no valido');
        break;
    }

    return url;
  }
}

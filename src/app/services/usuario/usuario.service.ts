import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirarchivoService } from '../subirarchivo/subirarchivo.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private subirarchivoService: SubirarchivoService
  ) {}

  guardarStorage(id: string, token: string, usuario: Usuario): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_API + '/login/google';
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_API + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_API + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal.fire({
          title: 'Exito',
          text: 'Usuario creado',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
        return resp.usuario;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    const url =
      URL_API +
      '/usuario/' +
      usuario._id +
      '?token=' +
      localStorage.getItem('token');

    return this.http.put(url, usuario).pipe(
      map((data: any) => {
        this.guardarStorage(data.usuario._id, this.token, data.usuario);
        swal.fire({
          title: 'Exito',
          text: 'Usuario modificado',
          icon: 'success',
          confirmButtonText: 'Cool',
        });

        return true;
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirarchivoService
      .subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal.fire({
          title: 'Exito',
          text: 'Usuario modificado',
          icon: 'success',
          confirmButtonText: 'Cool',
        });

        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch((resp) => {});
  }
}

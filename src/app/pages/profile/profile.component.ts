import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { SubirarchivoService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    private usuarioService: UsuarioService,
    private subirarchivoService: SubirarchivoService
  ) {}

  ngOnInit(): void {}

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    console.log(this.usuario);

    this.usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionarImagen(archivo: File) {
    if (typeof archivo === 'undefined') {
      this.imagenSubir = null;
      return;
    }

    if (!archivo.type.includes('image')) {
      swal.fire({
        title: 'Error',
        text: 'Solo archivos de imagenes',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    const reader = new FileReader();
    reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
  }

  subirImagen() {
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}

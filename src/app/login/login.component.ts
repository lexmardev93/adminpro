import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.googleInit();
    this.email = localStorage.getItem('email') || ''; // Si el local storage es undefined pone comillas vacias
    if (this.email !== '') {
      this.recuerdame = true;
    }
  }

  googleInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1095443520486-fsa210ek92ii1po033je6shaji0m5vtv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingIn(document.getElementById('btnGoogle'));
    });
  }

  attachSingIn(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle(token).subscribe(() => window.location.href = '/dashboard');
    });
  }

  ingresar(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }

    const usuario = new Usuario(
      null,
      formulario.value.email,
      formulario.value.password,
      null
    );

    this.usuarioService.login(usuario, this.recuerdame)
      .subscribe(() => this.router.navigate(['/dashboard']));
    console.log(formulario.valid);
    console.log(formulario.value);
  }
}

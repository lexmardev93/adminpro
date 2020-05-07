import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required), // El primer parametro es el valor por defecto luego las validaciones
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      pass2: new FormControl('', [Validators.required, Validators.minLength(8)]),
      condiciones: new FormControl(false)
    }, { validators: this.sonDiferentes('pass', 'pass2')});

    this.formulario.setValue({
      nombre: '',
      email: 'alexander@gmail.com',
      pass: '12345678',
      pass2: '123456789',
      condiciones: true
    });
  }

  sonDiferentes(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonDiferentes: true
      };
    };
  }

  registrarUsuario(): void {
    // console.log(this.formulario.errors);
    // if (this.formulario.value.condiciones.value === false) {
    //   swal('Debe de aceptar las condiciones', 'Error', 'warning');
    // }
    // console.log('Formulario valido:', this.formulario.valid);
    // console.log(this.formulario.value);

    if (this.formulario.valid) {
      let usuario = new Usuario(
        this.formulario.value.nombre,
        this.formulario.value.email,
        this.formulario.value.pass,
        'USER_ROLE'
      );

      this.usuarioService.crearUsuario(usuario).subscribe(resp => {
        console.log(resp);
        this.router.navigate(['/login']);
      });
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService,
  SharedService,
  SettingsService,
  UsuarioService,
  LoginGuard,
  SubirarchivoService,
} from './service.index';
import { HttpClientModule } from '@angular/common/http'; // Este es necesario para que los servicios puedan hacer peticiones http

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    SidebarService,
    SharedService,
    SettingsService,
    UsuarioService,
    LoginGuard,
    SubirarchivoService,
  ],
})
export class ServiceModule {}

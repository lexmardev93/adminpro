import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { NgModule } from '@angular/core';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: 'dashboard', canActivate: [LoginGuard], component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', canActivate: [LoginGuard], component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: 'graficas1', canActivate: [LoginGuard], component: Graficas1Component, data: { titulo: 'Graficas' } },
      { path: 'promesas', canActivate: [LoginGuard], component: PromesasComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', canActivate: [LoginGuard], component: RxjsComponent, data: { titulo: 'RxJS' } },
      { path: 'accountsettings', canActivate: [LoginGuard], component: AccountsettingsComponent, data: { titulo: 'Ajustes' } },
      { path: 'profile', canActivate: [LoginGuard], component: ProfileComponent, data: { titulo: 'Perfil' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }

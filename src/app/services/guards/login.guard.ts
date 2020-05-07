import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  token: string;

  constructor(private router: Router) { }

  canActivate(): boolean {
    this.token = localStorage.getItem('token') || '';
    if (this.token === '') {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}

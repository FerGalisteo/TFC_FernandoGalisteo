import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.getToken()) {
      return true; // Permitir acceso si hay un token válido
    } else {
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión si no hay un token válido
      return false;
    }
  }
}

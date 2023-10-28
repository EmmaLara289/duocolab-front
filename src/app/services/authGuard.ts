import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CheckUser } from './checkUser';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private checkUser: CheckUser) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const login = this.checkUser.login;
    const key_role = this.checkUser.userData.key_role;
    console.log(login);
    console.log(key_role);
    if (login !== false) {
      
    }else {
        // Usuario no autenticado
        // Restringe el acceso a las rutas protegidas
        this.router.navigate(['/auth/login']);
        return false;

  }
}
}

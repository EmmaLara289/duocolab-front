import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CheckUser } from './checkUser';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private checkUser: CheckUser) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const login = this.checkUser.login;
    const key_role = this.checkUser.userData.key_role;

    if (login !== false) {
      // Verifica si la URL a la que intenta acceder está en el menú
      const requestedUrl = state.url;
      const userMenu = JSON.parse(localStorage.getItem('respuesta') || '[]');
      console.log(typeof(userMenu));
      console.log(userMenu);

      const isAuthorized = userMenu.some((menuItem) => menuItem.link === requestedUrl);

      if (isAuthorized) {
        return true; // Usuario autorizado para acceder a la URL
      } else {
        console.error('Acceso no autorizado a la URL:', requestedUrl);
        this.router.navigate(['/pages/mis-tareas']); // Puedes redirigir a una página de acceso no autorizado
        return false;
      }
    } else {
      // Usuario no autenticado
      // Restringe el acceso a las rutas protegidas
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

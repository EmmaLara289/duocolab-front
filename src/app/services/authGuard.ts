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
      if (key_role === 2) 
        {
        // Si el usuario es un colaborador, verifica si está intentando acceder a una URL restringida
        const restrictedRoute =['/pages/area', '/pages/ticket','/pages/colaborador', '/pages/epica', '/pages/equipo', '/pages/estatus-tarea', '/pages/prioridad', '/pages/proyecto']; // Reemplaza 'ruta-restringida' con la URL que deseas restringir
        if (restrictedRoute.includes(state.url)) 
            {
            // Redirige a una página de acceso restringido si el colaborador intenta acceder a la URL restringida
            this.router.navigate(['/pages/tarea']); // Reemplaza 'pagina-restringida' con la URL de la página de acceso restringido
            return false;
            } 
        }else if(key_role === 3)
            {
                const restrictedRoute =['/pages/area', '/pages/tarea','/pages/colaborador', '/pages/epica', '/pages/equipo', '/pages/estatus-tarea', '/pages/prioridad', '/pages/proyecto']; // Reemplaza 'ruta-restringida' con la URL que deseas restringir
                if (restrictedRoute.includes(state.url)) {
                // Redirige a una página de acceso restringido si el coordinador intenta acceder a la URL restringida
                this.router.navigate(['/pages/ticket']); // Reemplaza 'pagina-restringida' con la URL de la página de acceso restringido
                return false;
                }
            }else if(key_role === 1)
                {
                    return true;
                } 
    }else {
        // Usuario no autenticado
        // Restringe el acceso a las rutas protegidas
        this.router.navigate(['/auth/login']);
        return false;

  }
}
}

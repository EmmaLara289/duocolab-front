import { Routes, RouterModule } from '@angular/router';

import { ReporteProyectosComponent } from './reporte_proyectos.component';

const routes: Routes = [
  {
    path: '',
    component: ReporteProyectosComponent
  }
];

export const routing = RouterModule.forChild(routes);
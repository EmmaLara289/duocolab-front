import { Routes, RouterModule } from '@angular/router';

import { ProyectoComponent } from './proyecto.component';

const routes: Routes = [
  {
    path: '',
    component: ProyectoComponent
  }
];

export const routing = RouterModule.forChild(routes);
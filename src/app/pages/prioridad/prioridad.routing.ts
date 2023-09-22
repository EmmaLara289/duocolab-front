import { Routes, RouterModule } from '@angular/router';

import { PrioridadComponent } from './prioridad.component';

const routes: Routes = [
  {
    path: '',
    component: PrioridadComponent
  }
];

export const routing = RouterModule.forChild(routes);
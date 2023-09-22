import { Routes, RouterModule } from '@angular/router';

import { EquipoComponent } from './equipo.component';

const routes: Routes = [
  {
    path: '',
    component: EquipoComponent
  }
];

export const routing = RouterModule.forChild(routes);
import { Routes, RouterModule } from '@angular/router';

import { MisTareasComponent } from './mis-tareas.component';

const routes: Routes = [
  {
    path: '',
    component: MisTareasComponent
  }
];

export const routing = RouterModule.forChild(routes);
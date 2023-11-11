import { Routes, RouterModule } from '@angular/router';

import { TableroComponent } from './tablero.component';

const routes: Routes = [
  {
    path: '',
    component: TableroComponent
  }
];

export const routing = RouterModule.forChild(routes);
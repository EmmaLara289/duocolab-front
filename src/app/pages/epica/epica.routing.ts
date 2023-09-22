import { Routes, RouterModule } from '@angular/router';

import { EpicaComponent } from './epica.component';

const routes: Routes = [
  {
    path: '',
    component: EpicaComponent
  }
];

export const routing = RouterModule.forChild(routes);
import { Routes, RouterModule } from '@angular/router';

import { ColaboradorComponent } from './colaborador.component';

const routes: Routes = [
  {
    path: '',
    component: ColaboradorComponent
  }
];

export const routing = RouterModule.forChild(routes);
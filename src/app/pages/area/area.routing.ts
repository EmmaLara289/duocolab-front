import { Routes, RouterModule } from '@angular/router';

import { AreaComponent } from './area.component';

const routes: Routes = [
  {
    path: '',
    component: AreaComponent
  }
];

export const routing = RouterModule.forChild(routes);
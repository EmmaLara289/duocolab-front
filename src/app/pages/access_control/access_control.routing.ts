import { Routes, RouterModule } from '@angular/router';

import { AccessControlComponent } from './access_control.component';

const routes: Routes = [
  {
    path: '',
    component: AccessControlComponent
  }
];

export const routing = RouterModule.forChild(routes);
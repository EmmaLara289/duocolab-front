import { Routes, RouterModule } from '@angular/router';

import { SprintsComponent } from './sprints.component';

const routes: Routes = [
  {
    path: '',
    component: SprintsComponent
  }
];

export const routing = RouterModule.forChild(routes);
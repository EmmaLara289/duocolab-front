import { Routes, RouterModule } from '@angular/router';

import { EstatusTareaComponent } from './estatus_tarea.component';

const routes: Routes = [
  {
    path: '',
    component: EstatusTareaComponent
  }
];

export const routing = RouterModule.forChild(routes);
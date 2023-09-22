import { Routes, RouterModule } from '@angular/router';

import { TareaComponent } from './tarea.component';

const routes: Routes = [
  {
    path: '',
    component: TareaComponent
  }
];

export const routing = RouterModule.forChild(routes);
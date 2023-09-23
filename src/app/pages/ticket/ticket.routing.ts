import { Routes, RouterModule } from '@angular/router';

import { TicketComponent } from './ticket.component';

const routes: Routes = [
  {
    path: '',
    component: TicketComponent
  }
];

export const routing = RouterModule.forChild(routes);
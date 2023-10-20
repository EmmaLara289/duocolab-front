import { Routes, RouterModule } from '@angular/router';

import { TicketStatusComponent } from './ticketStatus.component';
//ticketStatus
const routes: Routes = [
  {
    path: '',
    component: TicketStatusComponent
  }
];

export const routing = RouterModule.forChild(routes);
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TicketComponent } from './ticket.component';
import { routing } from './ticket.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    TicketComponent
  ]
})
export class TicketModule {}
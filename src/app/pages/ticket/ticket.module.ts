import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TicketComponent } from './ticket.component';
import { routing } from './ticket.routing';
import { NbButtonModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';
import { NbInputModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NbButtonModule,
    NbTreeGridModule,
    NbInputModule
  ],
  declarations: [
    TicketComponent
  ]
})
export class TicketModule {}
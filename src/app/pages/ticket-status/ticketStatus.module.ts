import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TicketStatusComponent } from './ticketStatus.component';
import { routing } from './ticketStatus.routing';
import { NbButtonModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';
import { NbInputModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';
import { NbFormFieldModule } from '@nebular/theme';
import { NbSearchModule } from '@nebular/theme';
import { NbDialogModule } from '@nebular/theme';
import { NbListModule, NbAutocompleteModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NbButtonModule,
    NbTreeGridModule,
    NbInputModule,
    NbCardModule,
    NbAlertModule,
    NbIconModule,
    NbFormFieldModule,
    NbSearchModule,
    ReactiveFormsModule,
    NbDialogModule,
    NbListModule,
    NbAutocompleteModule,
  ],
  declarations: [
    TicketStatusComponent
  ]
})
export class TicketStatusModule {}
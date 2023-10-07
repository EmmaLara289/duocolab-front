import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EquipoComponent } from './equipo.component';
import { routing } from './equipo.routing';
import { NbInputModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbPopoverModule } from '@nebular/theme';
import { NbSelectModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';
import { NbFormFieldModule } from '@nebular/theme';
import { NbSearchModule } from '@nebular/theme';
import { NbDialogModule } from '@nebular/theme';
import { NbListModule } from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbAlertModule,
    NbPopoverModule,
    NbSelectModule,
    NbIconModule,
    NbFormFieldModule,
    NbSearchModule,
    NbDialogModule,
    NbListModule
  ],
  declarations: [
    EquipoComponent,
  ]
})
export class EquipoModule {}
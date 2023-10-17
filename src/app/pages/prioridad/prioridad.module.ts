import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrioridadComponent } from './prioridad.component';
import { routing } from './prioridad.routing';
import { NbInputModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';
import { NbFormFieldModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbAlertModule,
    NbIconModule,
    NbFormFieldModule
  ],
  declarations: [
    PrioridadComponent
  ]
})
export class PrioridadModule {}
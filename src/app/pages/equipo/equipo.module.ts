import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EquipoComponent } from './equipo.component';
import { routing } from './equipo.routing';
import { NbInputModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NbInputModule,
    NbButtonModule
  ],
  declarations: [
    EquipoComponent
  ]
})
export class EquipoModule {}
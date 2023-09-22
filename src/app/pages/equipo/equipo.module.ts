import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EquipoComponent } from './equipo.component';
import { routing } from './equipo.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    EquipoComponent
  ]
})
export class EquipoModule {}
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrioridadComponent } from './prioridad.component';
import { routing } from './prioridad.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    PrioridadComponent
  ]
})
export class PrioridadModule {}
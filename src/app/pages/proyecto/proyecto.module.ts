import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProyectoComponent } from './proyecto.component';
import { routing } from './proyecto.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    ProyectoComponent
  ]
})
export class ProyectoModule {}
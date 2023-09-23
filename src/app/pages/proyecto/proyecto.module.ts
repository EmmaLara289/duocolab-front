import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProyectoComponent } from './proyecto.component';
import { routing } from './proyecto.routing';
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
    ProyectoComponent
  ]
})
export class ProyectoModule {}
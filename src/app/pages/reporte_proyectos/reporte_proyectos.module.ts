import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReporteProyectosComponent } from './reporte_proyectos.component';
import { routing } from './reporte_proyectos.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    ReporteProyectosComponent
  ]
})
export class reporteTareasModule {}
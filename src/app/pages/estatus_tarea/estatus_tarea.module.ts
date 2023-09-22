import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstatusTareaComponent } from './estatus_tarea.component';
import { routing } from './estatus_tarea.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    EstatusTareaComponent
  ]
})
export class EstatusTareaModule {}
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstatusTareaComponent } from './estatus_tarea.component';
import { routing } from './estatus_tarea.routing';
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
    EstatusTareaComponent
  ]
})
export class EstatusTareaModule {}
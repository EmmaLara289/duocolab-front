import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TareaComponent } from './tarea.component';
import { routing } from './tarea.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    TareaComponent
  ]
})
export class TareaModule {}
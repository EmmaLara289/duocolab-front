import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TareaComponent } from './tarea.component';
import { routing } from './tarea.routing';
import { NbInputModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbTreeGridModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NbInputModule,
    NbButtonModule,
    NbTreeGridModule
  ],
  declarations: [
    TareaComponent
  ]
})
export class TareaModule {}
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EpicaComponent } from './epica.component';
import { routing } from './epica.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    EpicaComponent
  ]
})
export class EpicaModule {}
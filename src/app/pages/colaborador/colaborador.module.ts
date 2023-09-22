import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ColaboradorComponent } from './colaborador.component';
import { routing } from './colaborador.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    ColaboradorComponent
  ]
})
export class ColaboradorModule {}
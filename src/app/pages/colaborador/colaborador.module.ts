import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ColaboradorComponent } from './colaborador.component';
import { routing } from './colaborador.routing';
import { 
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbFormFieldModule } from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbAlertModule,
    NbIconModule,
    NbFormFieldModule
  ],
  declarations: [
    ColaboradorComponent
  ]
})
export class ColaboradorModule {}
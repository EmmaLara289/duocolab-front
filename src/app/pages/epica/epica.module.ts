import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EpicaComponent } from './epica.component';
import { routing } from './epica.routing';
import { NbInputModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';
import { NbFormFieldModule } from '@nebular/theme';
import { NbSearchModule } from '@nebular/theme';
import { NbDialogModule } from '@nebular/theme';
import { NbListModule, NbAutocompleteModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';



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
    NbFormFieldModule,
    NbSearchModule,
    NbDialogModule,
    NbListModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EpicaComponent
  ]
})
export class EpicaModule {}
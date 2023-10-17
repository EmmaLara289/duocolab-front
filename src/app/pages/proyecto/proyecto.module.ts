import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProyectoComponent } from './proyecto.component';
import { routing } from './proyecto.routing';
import { NbInputModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NbAlertModule,
  NbButtonModule,
  NbTreeGridModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbAutocompleteModule

} from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbAlertModule,
    NbTreeGridModule,
    NbFormFieldModule,
    NbIconModule,
    ReactiveFormsModule,
    NbAutocompleteModule
  ],
  declarations: [
    ProyectoComponent
  ]
})
export class ProyectoModule {}
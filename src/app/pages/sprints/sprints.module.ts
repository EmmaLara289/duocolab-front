import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SprintsComponent } from './sprints.component';
import { routing } from './sprints.routing';
import { NbInputModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';
import { NbFormFieldModule } from '@nebular/theme';
import { NbToggleModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule } from '@nebular/theme';

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
    NbToggleModule,
    ReactiveFormsModule,
    NbAutocompleteModule
  ],
  declarations: [
    SprintsComponent
  ]
})
export class SprintsModule {}
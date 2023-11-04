import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomAutocompleteDirective } from '../../custom-autocomplete.directive';
import { TareaComponent } from './tarea.component';
import { routing } from './tarea.routing';
import { 
  NbListModule,
  NbAutocompleteModule,  
  NbInputModule,
  NbButtonModule,
  NbTreeGridModule,
  NbCardModule,
  NbAlertModule,
  NbFormFieldModule,
  NbIconModule,
  NbSelectModule,
  NbOptionComponent
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import {NgFor} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NbInputModule,
    NbButtonModule,
    NbTreeGridModule,
    NbCardModule,
    NbAlertModule ,
    NbFormFieldModule,
    NbIconModule,
    NbListModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
    NbSelectModule
  ],
  declarations: [
    TareaComponent,
  ]
})
export class TareaModule {}
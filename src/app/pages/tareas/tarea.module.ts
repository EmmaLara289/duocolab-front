import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
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
} from '@nebular/theme';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
    
  ],
  declarations: [
    TareaComponent
  ]
})
export class TareaModule {}
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableroComponent } from './tablero.component';
import { routing } from './tablero.routing';
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
import { ListaComponent } from './components/lista/lista.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';


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
    NbAutocompleteModule,
    DragDropModule,
    MatIconModule
  ],
  declarations: [
    TableroComponent,
    ListaComponent,
    TareaComponent
  ]
})
export class TableroModule {}
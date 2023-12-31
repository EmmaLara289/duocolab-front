import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AreaComponent } from './area.component';
import { routing } from './area.routing';
import { NbInputModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';
import { NbFormFieldModule } from '@nebular/theme';
 
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
    AreaComponent
  ]
})
export class AreaModule {}
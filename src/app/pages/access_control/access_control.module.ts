import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccessControlComponent } from './access_control.component';
import { routing } from './access_control.routing';
import { NbInputModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';
import { NbFormFieldModule } from '@nebular/theme';
import { NbToggleModule } from '@nebular/theme';

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
    NbToggleModule
  ],
  declarations: [
    AccessControlComponent
  ]
})
export class AccessControlModule {}
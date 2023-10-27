import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccessControlComponent } from './access-control.component';
import { routing } from './access-control.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [
    AccessControlComponent
  ]
})
export class AccessControlModule {}
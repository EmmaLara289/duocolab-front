import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AreaComponent } from './area.component';
import { routing } from './area.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    AreaComponent
  ]
})
export class AreaModule {}
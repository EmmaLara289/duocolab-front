import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { routing } from './login.routing';
import { NbInputModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NbInputModule,
    NbButtonModule
  ],
  declarations: [
    LoginComponent,
    
  ]
})
export class LoginModule {}
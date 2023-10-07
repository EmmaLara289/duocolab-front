import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';


@Injectable({
  providedIn: 'root',
})
export class Modal{
  constructor(public ref: NbDialogRef<Modal>) {}

  dismiss(){
    this.ref.close();
  }

}

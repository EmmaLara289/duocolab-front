import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.scss'],
})
export class ShowcaseComponent {

  @Input() title: string;

  constructor(public ref: NbDialogRef<ShowcaseComponent>) {}

  public dismiss() {
    this.ref.close();
  }
}


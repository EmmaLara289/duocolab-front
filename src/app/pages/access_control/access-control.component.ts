import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../../services/user.service';
//import { AgentService } from 'src/app/services/agent.service';
import { MatDialog } from '@angular/material/dialog';
//import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
//import { MatSnackBar } from '@angular/material/snack-bar';
//import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
//import { EditAccessibilityComponent } from '../edit-accessibility/edit-accessibility.component';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.sass']
})
export class AccessControlComponent implements OnInit {
  @ViewChild('roleTemplate', { static: true }) public roleTemplate: TemplateRef<any>;
  //@ViewChild(DatatableComponent, { static: false }) public table: DatatableComponent;
  //@ViewChild(DatatableComponent, { static: false }) public table2: DatatableComponent;

  public authorized:boolean = false;
  public rows = [];
  public selectedRowData: selectRowInterface;
  public newUserImg = 'assets/images/user/user1.jpg';
  public data: any = [];
  public filteredData = [];
  public editForm: FormGroup;
  public register: FormGroup;
  public selectedOption: string;
  public module_options: any = [];
  public columns = [
    { name: 'id_user' },
    { name: 'name' },
    { name: 'email' },
    { name: 'telephone' }

  ];
  constructor(private userService: UserService,
    private agentService: UserService,
    private fb: FormBuilder,
    //private _snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.fetch((data) => {
      this.data = data;
      this.filteredData = data;
    });

    //this.authorized = this.userService.isMenuOptionAuthorized("/users/access-control")
  }


  fetch(cb) {
    this.userService.getColaboradores().subscribe(
      (response: any) => {
        cb(response);
      },
      (error: any) => {
        if (error.error.token != undefined) {
         // this.userService.showSessionExpiredWindow();
        }
      }
    );

  }




 /* editAccessibility(id_user) {
    const dialogRef = this.dialog.open(EditAccessibilityComponent, {
      data: {
        id_user: id_user,
        //userToken: this.userService.getToken()
      },
      disableClose: true,
      width: '100%'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != 'CANCELED') {
        this.showNotification(
          'bg-green',
          'Datos guardados',
          'bottom',
          'center'
        );

        this.fetch((data) => {
          this.data = data;
          this.filteredData = data;
        });
      }
    });
  }

*/



  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.filteredData[0]);
    // assign filtered matches to the active datatable
    this.data = this.filteredData.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (
          item[keys[i]] != undefined &&
          item[keys[i]] != null &&
          (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
            !val)
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    /*this._snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });*/
  }

}
export interface selectRowInterface {
  id_user: Number;
  name: String;
  email: String;
  telephone: string
}

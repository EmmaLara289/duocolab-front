import { Component, AfterViewInit, Inject, ViewChild } from '@angular/core';
//import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
//import { AgentService } from 'src/app/services/agent.service';
//import { DialogWindowComponent } from 'src/app/shared/dialog-window/dialog-window.component';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-accessibility',
  templateUrl: './edit-accessibility.component.html',
  styleUrls: ['./edit-accessibility.component.sass']
})
export class EditAccessibilityComponent implements AfterViewInit {
  @ViewChild('options_table') private table: any;
  public advanceTableForm: FormGroup;
  private userToken: any = null;
  public selectedIdModule: number = 1;
  public modules: any[] = [];
  public options: any[] = [];
  public module_options: any[] = [];
  public module_options_to_send: any[] = [];
  //private dialogWindowFullLoaded: boolean = false;
  DialogWindowComponent: any;
  public modal: any = null;
  constructor(
   /* private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<EditAccessibilityComponent>,*/
    private fb: FormBuilder,
    private userService: UserService,
    //private agentService: AgentService,
    private dialogService: NbDialogService,

  ) {
    //this.userToken = this.userService.getToken();

  }
  
  public ngAfterViewInit(): void {
    // Abre el cuadro de diálogo utilizando DialogService sin contenido específico
    this.dialogService.open(<any> { /* opciones del cuadro de diálogo */ })
      .onClose.subscribe(() => {
        // Código que se ejecutará después de que se cierre el cuadro de diálogo
        this.resizeTable();
        this.getModules();
      });
  }

  public updateAccesibility(row) {
    this.module_options.push(row);

    for (var i = 0; i < this.module_options.length; i++) {
      const elemento = this.module_options[i];

      if (!this.module_options_to_send.includes(this.module_options[i])) {
        this.module_options_to_send.push(elemento);
      }
    }
  }

  // Send data to update access control.
  public submit(): void {
    let data = {
      //id_user: this.data.id_user,
      module_options: this.module_options_to_send
    }

    /*const dialogRef = this.matDialog.open(this.DialogWindowComponent, {
      data: {
        message: '<span style="font-size: 14pt;">¿Desea guardar los cambios?</span>',
        confirmButtonText: 'Continuar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        showIcon: false,
        icon: 'info',
        iconColored: false
      },
      disableClose: true,
      width: 'auto',
      maxWidth: '600px'
    });*/

    //dialogRef.afterClosed().subscribe((result: any) => {
      /*if (result == 'OK') {
        this.userService.updateAccessControl(data, this.userToken).subscribe(
          (response: any) => {
            this.dialogRef.close();
          },
          (error: any) => {
            if (error.error.token != undefined) {
              this.userService.showSessionExpiredWindow();
            }
          }
        );
      }*/
    //});


  }

  public getModules() {
    this.userService.getModules().subscribe(
      (response: any) => {
        this.modules = response;
        this.getOptions();
      },
      (error: any) => {
        if (error.error.token != undefined) {
          //this.userService.showSessionExpiredWindow();
        }
      }
    );

  }

  public getOptions() {
    this.userService.getModuleOptionsByUser(19, this.selectedIdModule)
      .subscribe(
        (response: any) => {
          this.options = response;
        },
        (error: any) => {
          if (error.error.token != undefined) {
            //this.userService.showSessionExpiredWindow();
          }
        }
      );
    this.resizeTable();
  }

  private resizeTable(): void {
    if (this.modal !== null) {
      this.table.offset = 0;
      this.table.recalculate();
    }
  }

  public onWindowResize(event: any): void {
    this.resizeTable();
  }
  private showNotification(
    colorName: string,
    text: string,
    placementFrom: any,
    placementAlign: any,
    duration: number
  ): void {
    /*this.matSnackBar.open(text, '', {
      duration: duration,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });*/
  }
}

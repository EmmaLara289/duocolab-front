import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstatusTarea } from '../../models/estatus_tarea';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-estatus_tarea',
  templateUrl: './estatus_tarea.component.html',
  styleUrls: ["./estatus_tarea.component.scss"]
})

export class EstatusTareaComponent implements OnInit {
  public identity;
  modalRegister = false;
  alert = false;
  alertUpdate = false;
  id_estatus:string=null;
  public status: string;
  estatus: any=[];
  text: string = '';
  myList: any=[];
  estatustarea: EstatusTarea;
  estatustareaCopy: any;
  myList2: any;
  modalTable = false;
  page = 1;
  modalName: any;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient,
 private dialogService: NbDialogService
  ) { 
  this.estatustarea = new EstatusTarea('','');
  }

  ngOnInit(){
  this._userService.getPaginationEstatusTareas(this.page).subscribe((response) => {
      this.myList = response;
    });
  }

  registrarEstatusTarea(){
  this._userService.registrarEstatusTarea(this.estatustarea.nombre).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        //this.alert = true;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        });
        this.closeModal();
        }

      },
      error => {
        Swal.fire('UPS', 'El estatustarea no se ha podido registrar.', 'error');
        this.status = 'error';
      }
   		);
	}

  updateEstatusTarea(){
  this._userService.updateEstatusTarea(this.estatustareaCopy.id_estatus, this.estatustareaCopy.nombre).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        //this.alertUpdate = true;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        });
        this.closeModal();
        }

      },
      error => {
        Swal.fire('UPS', 'El estatustarea no se ha podido registrar.', 'error');
      }
      );
  }

  buscarEstatusTareas() {
    this._userService.findEstatusTarea(this.text, this.page).subscribe((response) => {
      this.myList2 = response;
      this.modalTable = true;
      console.log(response);
    });
  }

  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(item, dialog: TemplateRef<any>){
  //this.modalUpdate = true;
  this.estatustareaCopy = {...item};
  this.modalUpdate(dialog);
  /*this.id_estatus = id_estatus;
  this.estatustarea = { ...this.myList.find(item => item.id_estatus === id_estatus) };
  console.log(this.id_estatus);*/
  }

  modalUpdate(dialog: TemplateRef<any>) {
    this.modalName = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  closeModal(){
    //this.modalRegister = false;
    //this.modalUpdate = false;
    this.modalName.close();
    this.clearData();
  }

  clearData(){
    this.estatustarea = new EstatusTarea('','');
  }

  closeAlert(){
    this.alert = false;
    this.alertUpdate = false;
  }

  next(){
    this.page ++;
    if(this.modalTable === false){
    this._userService.getPaginationEstatusTareas(this.page).subscribe((response) => {
      if(response.length !== 0){
        this.myList = response;
      }else{
        this.page --;
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No hay más resultados',
          showConfirmButton: false,
          timer: 1200
        })
      }
    });
  }else{
    this._userService.findEstatusTarea(this.text, this.page).subscribe((response) => {
      if(response.length !== 0){
        this.myList2 = response;
      }else{
        this.page --;
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No hay más resultados',
          showConfirmButton: false,
          timer: 1200
        })
      }
    });
  }
  }

  preview(){
    if(this.page > 1){
      this.page --;
      if(this.modalTable === false){
      this._userService.getPaginationEstatusTareas(this.page).subscribe((response) => {
        if(response.length !== 0){
          this.myList = response;
        }else{
          this.page --;
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No hay más resultados',
            showConfirmButton: false,
            timer: 1200
          })
        }
      });
    }else{
      this._userService.findEstatusTarea(this.text, this.page).subscribe((response) => {
        if(response.length !== 0){
          this.myList2 = response;
        }else{
          this.page --;
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No hay más resultados',
            showConfirmButton: false,
            timer: 1200
          })
        }
      });
    }
  }
  }
  

}

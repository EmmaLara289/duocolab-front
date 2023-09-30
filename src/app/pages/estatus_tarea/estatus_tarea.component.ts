import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstatusTarea } from '../../models/estatus_tarea';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  modalUpdate = false;
  id_estatus:string=null;
  public status: string;
  estatus: any=[];
  text: string = '';
  myList: any=[];
  estatustarea: EstatusTarea;
  estatustareaCopy: any;
  myList2: any;
  modalTable: any;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient

  ) { 
  this.estatustarea = new EstatusTarea('','');
  }

  ngOnInit(){
  this._userService.getEstatusTareas().subscribe((response) => {
      this.myList = response;
    });
  }

  registrarEstatusTarea(){
  this._userService.registrarEstatusTarea(this.estatustarea.nombre).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        this.alert = true;
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
        this.alertUpdate = true;
        this.closeModal();
        }

      },
      error => {
        Swal.fire('UPS', 'El estatustarea no se ha podido registrar.', 'error');
      }
      );
  }

  buscarEstatusTareas() {
    this._userService.findEstatusTarea(this.text).subscribe((response) => {
      this.myList2 = response;
      this.modalTable = true;
      console.log(response);
    });
  }

  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(item){
  this.modalUpdate = true;
  this.estatustareaCopy = {...item};
  /*this.id_estatus = id_estatus;
  this.estatustarea = { ...this.myList.find(item => item.id_estatus === id_estatus) };
  console.log(this.id_estatus);*/
  }

  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    this.clearData();
  }

  clearData(){
    this.estatustarea = new EstatusTarea('','');
  }

  closeAlert(){
    this.alert = false;
    this.alertUpdate = false;
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Tarea } from '../../models/tarea';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ["./tarea.component.scss"]
})


export class TareaComponent {
  public identity;
  public status: string;
  tareas: any=[];
  termino: string;
  myList: any=[];
  tarea: Tarea;
  modalRegister = false;
  id_tarea:string=null;
  modalUpdate = false;
  alertUpdate = false;
  alert = false;
  tareaCopy: any;

  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient

  ) { 
  this.tarea = new Tarea('','','','','','','');
  //this.tareaCopy = new Tarea('','','','','','','');
  }

  ngOnInit(){
  this._userService.getTareas().subscribe((response) => {
      this.myList = response;
    });
  }

  registrarTarea(){
  this._userService.registrarTarea(this.tarea.nombre, this.tarea.descripcion, this.tarea.key_epica, this.tarea.key_sprint, this.tarea.key_proyecto, this.tarea.key_colaborador).subscribe(
      response => {
      if(response.status != 'error'){
          this.ngOnInit();
          this.alert = true;
          this.clearData();
        }

      },
      error => {
        Swal.fire('UPS', 'La tarea no se ha podido registrar.', 'error');
      }
   		);
	}

  updateTarea(){
  this._userService.updateTarea(this.tareaCopy.id_tarea, this.tareaCopy.nombre, this.tareaCopy.descripcion, this.tareaCopy.key_epica, this.tareaCopy.key_sprint, this.tareaCopy.key_proyecto, this.tareaCopy.key_colaborador).subscribe(
      response => {
      if(response.status != 'error'){
          this.ngOnInit();
          this.alertUpdate = true;
          this.clearData();
          this.closeModal();
        }

      },
      error => {
        Swal.fire('UPS', 'La tarea no se ha podido registrar.', 'error');
        this.status = 'error';
      }
      );
  }

  buscarTareas() {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/searchTareas?text=${this.termino}`)
      .subscribe(tareas => {
        this.tareas = tareas;
      });
  }

  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(item) {
    this.modalUpdate = true;
    this.tareaCopy = { ...item };
    //this.tarea = { ...this.myList.find(item => item.id_tarea === id_tarea) };
    //console.log(this.id_tarea);
  }



  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    this.clearData();
    console.log('Modal cerrado');
  }

  closeAlert(){
    this.alertUpdate = false;
    this.alert = false;
  }

  clearData(){
  this.tarea = new Tarea('','','','','','','');
  this.tareaCopy= new Tarea('','','','','','','');
  }

  
}

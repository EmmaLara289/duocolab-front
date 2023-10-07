import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from '../../models/equipo';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { Modal } from '../../services/modal';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ["./equipo.component.scss"],
})

export class EquipoComponent implements OnInit {
  id_equipo: string = null;

  public identity;
  public status: string;
  modalRegister = false;
  modalUpdate = false;
  equipo: Equipo;
  equipoCopy: any;
  equipos: any=[];
  text: string= "";
  myList: any=[];
  alert = false;
  alertUpdate = false;
  myList2: any;
  modalTable: any;
  integrantes: any;
  user: any;
  modalUsers = false;
  proyecto: any;
  idSelectedUser = "";
  idSelectedProyect = "";
  nameProyect: any;
  idsText = "";
  usersList: any;
  proyectList: any;
  modalList = false;
  dialogProyect = false;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient,
  private dialogService: NbDialogService,
  ) { 
  this.equipo = new Equipo('','','','');
  }

  ngOnInit(){
  this._userService.getEquipos().subscribe((response) => {
      this.myList = response;
    });

  this._userService.getUsers().subscribe((response) => {
      this.user = response;
      //console.log(response);
  });

  this._userService.getProyectos().subscribe((response) => {
    this.proyecto = response;
    console.log(response);
  });

  
  }


  registrarEquipo(){
  this._userService.registrarEquipo(this.equipo.nombre, this.equipo.key_proyecto, this.equipo.key_colab).subscribe(
      response => {
      if(response.status != 'error'){
          this.ngOnInit();
          this.clearData();
          this.alert = true;
        }

      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
      }
   		);
	}

  updateEquipo(){
  this._userService.updateEquipo(this.equipoCopy.id_equipo, this.equipoCopy.nombre, this.equipoCopy.key_proyecto, this.equipoCopy.key_colab).subscribe(
      response => {
      if(response.status != 'error'){
          this.ngOnInit(); 
          this.clearData(); 
          this.closeModal();
          this.alertUpdate = true;
        }

      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');

      }
      );
  }

  buscarEquipos() {
    this._userService.findEquipo(this.text).subscribe((response) => {
      this.myList2 = response;
      this.modalTable = true;
      console.log(response);
    });
  }

  openModal() {
  this.modalRegister = true;
  }

  selectEquipo(item, dialog: TemplateRef<any>){
    this.integrantes = item.integrantes;
    //console.log(this.integrantes);
    //console.log(this.user);

    this.open2(dialog);
  }

  openModalUpdate(item) {
    this.modalUpdate = true;
    this.equipoCopy = {...item};
    /*this.id_equipo = id_equipo;
    this.equipo = { ...this.myList.find(item => item.id_equipo ===        id_equipo) };*/
  }

  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    this.clearData(); 
  }

  closeAlert(){
    this.alert = false;
    this.alertUpdate = false;
  }

  openAlert(){
    this.alert = true;
    this.alertUpdate = true;
  }

  clearData(){
    this.equipo = new Equipo('','','','');
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }
//el nombre de la variable del array no debe de ser el mismo que el del template
  dialogUsers(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
      this.modalList = true;
  }
  
  dialogProyectos() {
    this.dialogProyect = true;
  }

  dialogProyectosClose() {
    this.dialogProyect = false;
  }

  dialogUserList(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog',
      hasBackdrop: false, });
  }

  selectedUsers(id){
    if(this.idSelectedUser === ""){
      this.idSelectedUser = id;
      this.team(this.idSelectedUser);
    }else{
      this.idSelectedUser = this.idSelectedUser + "," + id;
      let colabs: string[] = this.idSelectedUser.split(',');
      this.team(this.idSelectedUser);
    //console.log(colabs);
    }
    this.equipo.key_colab = this.idSelectedUser;
    const index = this.user.findIndex(user => user.id === id);
    //console.log(index);

    // Si el usuario se encuentra en el array, elimínalo usando splice()
    if (index !== -1) {
      this.user.splice(index, 1);
     //console.log('Usuario eliminado:', id);
    }
    //console.log(this.idSelectedUser); 
  }

  selectedProyect(item){
    this.idSelectedProyect = item.id_proyecto;
    this.equipo.key_proyecto = this.idSelectedProyect;
    this.nameProyect = item.nombre;
    this.dialogProyectosClose();
  }

  team(ids: string){
    this._userService.findUsers(ids).subscribe((response) => {
      this.usersList = response;
      console.log("Seleccionados:" ,this.usersList);
    });
  }

  proyect(ids: string){
    this._userService.findProyect(ids).subscribe((response) =>{
      this.proyectList = response;
      console.log("Seleccionados:" ,this.proyectList);
    })
  }

  



}

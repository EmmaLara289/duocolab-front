import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Equipo } from '../../models/equipo';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ["./equipo.component.scss"]
})

export class EquipoComponent implements OnInit {
  @ViewChild('registrarEquipoForm') registrarEquipoForm: NgForm;

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
  users: any;
  modalUsers = false;
  proyectos: any;
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
      console.log(response);
    });

  this._userService.getUsers().subscribe((response) =>{
    this.users = response;
    console.log(this.users);
  })/*;
  
  this._userService.getProyectos().subscribe((response) => {
    this.proyectos = response;
  });*/
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
    console.log(this.integrantes);
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

  dialogUsers(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }
  
  dialogProyectos(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }






}

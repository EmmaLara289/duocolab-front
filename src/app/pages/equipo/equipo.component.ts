import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from '../../models/equipo';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
//import { ShowcaseComponent } from '../../services/modal';
import { NbDialogRef } from '@nebular/theme';
import { type } from 'os';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ["./equipo.component.scss"],
})

export class EquipoComponent implements OnInit {
  private ref: NbDialogRef<any>;
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
  nameProyect = "";
  idsText = "";
  usersList: any;
  proyectList: any;
  modalList = false;
  dialogProyect = false;
  countUsers = 0;
  usersText: string  = "";
  private Modal: any;
  dialgoEditList: any;
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
    //console.log(response);
  });

  
  }


  registrarEquipo(){
  this._userService.registrarEquipo(this.equipo.nombre, this.equipo.key_proyecto, this.equipo.key_colab).subscribe(
      response => {
      if(response.status != 'error'){
          this.ngOnInit();
          this.clearData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Guardado con éxito',
            showConfirmButton: false,
            timer: 1200
          })
          this.idSelectedProyect = "";
          this.idSelectedUser = "";
          this.nameProyect = "";
          this.usersText = "";
          this.modalTable = false;
        }

      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
      }
   		);
	}

  updateEquipo(){
    console.log(this.equipoCopy);
    const key_colab = this.equipoCopy.id_proyecto.toString();
  this._userService.updateEquipo(this.equipoCopy.id_equipo, this.equipoCopy.nombre, key_colab, this.equipoCopy.id_colaboradores).subscribe(
      response => {
      if(response.status != 'error'){
          this.ngOnInit(); 
          this.clearData(); 
          //this.closeModal();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Guardado con éxito',
            showConfirmButton: false,
            timer: 1200
          })
          this.modalTable = false;
          this.dismiss();
        }

      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');

      }
      );
  }

  buscarEquipos() {
    if(this.text === ""){
      this._userService.getEquipos().subscribe((response) => {
        this.myList = response;
        this.modalTable = false;
      });
    }else{
    this._userService.findEquipo(this.text).subscribe((response) => {
      if(response.response !== "No hay coincidencias"){
      this.myList2 = response;
      this.modalTable = true;
      console.log(response);
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No hay resultados...',
          showConfirmButton: false,
          timer: 1200
        });
      }
    });
  }
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

  openModalUpdate(item, dialog: TemplateRef<any>) {
    this.modalUpdate = true;
    this.equipoCopy = {...item};
    console.log(item);
    //console.log(this.equipoCopy.nombre_proyecto);
    this.dialogEdit(dialog);
    this.usersText = this.equipoCopy.contador_coloboradores + " Integrantes";
    //console.log("Hay ",this.usersText);
    /*this.id_equipo = id_equipo;
    this.equipo = { ...this.myList.find(item => item.id_equipo ===        id_equipo) };*/
  }



  dialogEditListUsers(dialogListUsers: TemplateRef<any>) {
    this.dialgoEditList = this.dialogService.open(
      dialogListUsers,
      { context: 'this is some additional data passed to dialog' }
    );

    this.idSelectedUser = this.equipoCopy.id_colaboradores;

    this.excluseUsers(this.idSelectedUser);
    this._userService.findUsers(this.idSelectedUser).subscribe((response) => {
      this.usersList = response;
      //console.log("Seleccionados:" ,this.usersList);
      //console.log(this.idSelectedUser);
    });
    
      
  }

  selectedProyectEdit(item){
    this.equipoCopy.id_proyecto = this.idSelectedProyect;
    this.equipoCopy.nameProyect = item.nombre;
    this.dismiss();
  }

  dismiss() {
    console.log("Se borró");
    this.idSelectedUser = "";
    this.usersText = "";    
    this.recargarTablaUsers();
    this.ref.close();
    this.usersList = [];
  }

  dismissEdit(){
    this.dialgoEditList.close();
  }

  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
//    this.clearData(); 
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
  
  dialogProyectos(dialog: TemplateRef<any>) {
    this.ref = this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
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
    const numerosArray = this.idSelectedUser.split(',');
    //console.log(numerosArray.length);
    if(numerosArray.length === 1){
      this.countUsers = this.countUsers + 1;
      console.log("igual a " ,this.countUsers);
    }
    else{
      this.countUsers = numerosArray.length;
      this.countUsers = this.countUsers + 1;
      console.log("igual a " ,this.countUsers);
    }
    
    if(this.countUsers === 1){
      this.usersText = "1 Integrante";
    }else{
      this.usersText = this.countUsers+" Integrantes";
    }
    //console.log("contador: ",this.countUsers);
    if(this.idSelectedUser === ""){
      this.idSelectedUser = id.toString(); // Convierte el número a cadena antes de asignarlo
      this.team(this.idSelectedUser);

    }else{
      this.idSelectedUser = this.idSelectedUser + "," + id;
      let colabs: string[] = this.idSelectedUser.split(',');
      this.team(this.idSelectedUser);
    //console.log(colabs);
    }
    this.equipo.key_colab = this.idSelectedUser;
    const index = this.user.findIndex(user => user.id === id);
    //
    //console.log(id, 'es de tipo ', typeof(id)); number
    //console.log(index);
    // Si el usuario se encuentra en el array, elimínalo usando splice()
    if (index !== -1) {
      this.user.splice(index, 1);
     //console.log('Usuario eliminado:', id);
    }
    //contador de usuarios
    this.countUsers = numerosArray.length;
    //console.log(numerosArray);
    
    //console.log(this.usersText);
  }

  deleteSelectedUsers(id_user){
    this.countUsers = this.countUsers - 1;
    if (this.idSelectedUser.includes(',')) {
     // console.log("Hay ",this.idSelectedUser, " integrantes.")
      let numeros = this.idSelectedUser.split(',');

    // Número específico que deseas eliminar
    //let numeroAEliminar = '3'; // Por ejemplo, eliminar el número 3
    //convierte en cadena
    let idCadena = id_user.toString();
    //console.log(typeof(id_user), id_user);
    // Encontrar el índice del número específico en el array
    let indice = numeros.indexOf(idCadena);

    // Si se encuentra el número, eliminarlo del array
    if (indice !== -1) {
        numeros.splice(indice, 1);
    }

    // Volver a unir los números en una cadena, separados por comas
    this.idSelectedUser = numeros.join(',');

    /*this.recargarTablaUsers();
    console.log("Aqui no se ha borrado nada:" ,this.user);

    //console.log("Borró:" ,idCadena, " y queda el ", this.idSelectedUser);
    //console.log(typeof(this.idSelectedUser));

    let idSobranteArray = this.idSelectedUser.split(',');      
    //console.log('Ids sobrantes: ', idSobranteArray);
    //let idSobranteArray: number[] = this.idSelectedUser.split(',').map(item => parseInt(item, 10));
    //console.log(typeof(idSobranteArray));
    //console.log(typeof(this.user.id));

    console.log("numeros a borrar:" , this.idSelectedUser);
    // Iterar sobre los números en idSobranteArray y eliminar los usuarios correspondientes de this.user
    idSobranteArray.forEach(id => {
      const idNumero = parseInt(id, 10); // Convertir texto a número
      //console.log(idNumero, " es de tipo ", typeof(idNumero));
      //this.deleteUserTable(idNumero);
    });
*/
    this.excluseUsers(this.idSelectedUser);
    this.team(this.idSelectedUser);
    const numerosArray = this.idSelectedUser.split(',');
    this.countUsers = numerosArray.length;
    //console.log("despues de borrar hay:", numerosArray.length);
    if(numerosArray.length === 1){
      this.usersText = "1 Integrante";  
    }else{
    this.usersText = this.countUsers + " Integrantes";
    }

  } else {
    //console.log("Hay solo uno");
    this.idSelectedUser = "";
    this.usersList = [];

      this._userService.getUsers().subscribe((response) => {
        this.user = response;
        //console.log(response);
    });

    //this.usersText = "Seleccionar"
    

  }

  
    
  }

  selectedProyect(item){
    this.idSelectedProyect = item.id_proyecto;
    this.equipo.key_proyecto = this.idSelectedProyect;
    this.nameProyect = item.nombre;
    this.dismiss();
  }

  team(ids: string){
    if(ids !== ""){
      this._userService.findUsers(ids).subscribe((response) => {
        this.usersList = response;
        //console.log("Seleccionados:" ,this.usersList);
        //console.log(this.idSelectedUser);
      });
    }
  }

  proyect(ids: string){
    this._userService.findProyect(ids).subscribe((response) =>{
      this.proyectList = response;
      //console.log("Seleccionados:" ,this.proyectList);
    })
  }


  recargarTablaUsers(){
    this._userService.getUsers().subscribe((response) => {
      this.user = response;
      });
  }

  excluseUsers(ids){
    this._userService.excludeUsers(ids).subscribe((response) =>{
      this.user = response;
    })
  }

  deleteUserTable(id: number){
    const index = this.user.findIndex(user => user.id === id);
    console.log("Aqui se ha borrado el numero:",id ," de " ,this.user);
    console.log("valor de index: ",index);
  // Si el usuario se encuentra en el array, elimínalo usando splice()
  if (index !== -1) {
    this.user.splice(index, 1);
   //console.log('Usuario eliminado:', id);
  }
  }

  dialogEdit(dialogEidt: TemplateRef<any>) {
    this.ref = this.dialogService.open(
      dialogEidt,
      { context: 'this is some additional data passed to dialog' });

  }



}

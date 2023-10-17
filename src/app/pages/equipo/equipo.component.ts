import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from '../../models/equipo';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ["./equipo.component.scss"],
})

export class EquipoComponent implements OnInit {

  @ViewChild('ProyectAuto') autoProyect: ElementRef;

  filtredProyects: Observable<string[]>;

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
  modalTable = false;
  integrantes: any;
  colabs: any;
  modalUsers = false;
  proyecto: any;
  idSelectedUser = "";
  idSelectedProyect = "";
  nameProyect = "";
  idsText = "";
  colabsList: any;
  proyectList: any;
  modalList = false;
  dialogProyect = false;
  countUsers = 0;
  usersText: string  = "";
  private Modal: any;
  dialgoEditList: any;
  dialogoEditProyectos: any;
  modalProyectos: any;
  modalEdit: any;
  modalEditProyectos: any;
  form: FormGroup;
  proyectoList: any;
  page = 1;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient,
  private dialogService: NbDialogService,
  private fb: FormBuilder,
  ) { 
  this.equipo = new Equipo('','','','');

  this.form = this.fb.group({
    proyecto: ['']
  });
  }

  private _filterP(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.proyectoList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  onChangeProyect($event) {
    console.log('el valor: ',$event);
    //this.filtredProyects$ = this.getFilteredOptionsProyect(this.autoProyect.nativeElement.value);
  }
  
  onProyectSelected(item) {
    console.log(item);
    const id = this.proyectoList.find(option => option.nombre === item);
    console.log('ID: ',id);
    this.equipo.key_proyecto = id.id_proyecto;
    // Aquí puedes hacer lo que necesites con el objeto completo de la opción seleccionada
  }

  ngOnInit(){
  this._userService.getPaginationEquipos(this.page).subscribe((response) => {
      this.myList = response;
    });

  this._userService.getColaboradores().subscribe((response) => {
      this.colabs = response;
      //console.log(response);
  });

  this._userService.getProyectos().subscribe((response) => {
    this.proyectoList = response;
    this.filtredProyects = this.form.get('proyecto').valueChanges.pipe(
      startWith(''),
      map(value => this._filterP(value))
    );
    //console.log("Proyectos: ",response);
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
          this.form.reset();
        }

      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
      }
   		);
	}

  updateEquipo(){
    console.log(this.equipoCopy);
    const key_proyecto = this.equipoCopy.id_proyecto.toString();
    this.equipoCopy.id_colaboradores = this.idSelectedUser;
    console.log(this.idSelectedUser);
      this._userService.updateEquipo(this.equipoCopy.id_equipo, this.equipoCopy.nombre, key_proyecto, this.equipoCopy.id_colaboradores).subscribe(
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
          this.closeModalEdit();
        }

      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');

      }
      );
  }

  buscarEquipos() {
    this.page = 1;
    if(this.text === ""){
      this._userService.getPaginationEquipos(this.page).subscribe((response) => {
        this.myList = response;
        this.modalTable = false;
      });
    }else{
    this._userService.findEquipo(this.text, this.page).subscribe((response) => {
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
    this.integrantes = item.integrantes;
    this.equipoCopy = {...item};
    console.log(item);
    //console.log(this.equipoCopy.nombre_proyecto);
    this.dialogEdit(dialog);
    if(this.equipoCopy.contador_coloboradores === 1){
      this.usersText = "1 Integrante";
    }else{
    this.usersText = this.equipoCopy.contador_coloboradores + " Integrantes";
    }
    this.idSelectedUser = this.equipoCopy.id_colaboradores;
    console.log(this.idSelectedUser);
    //console.log("Hay ",this.usersText);
    /*this.id_equipo = id_equipo;
    this.equipo = { ...this.myList.find(item => item.id_equipo ===        id_equipo) };*/
  }



  dialogEditListUsers(dialogListUsers: TemplateRef<any>) {
    this.dialgoEditList = this.dialogService.open(
      dialogListUsers,
      { context: 'this is some additional data passed to dialog' }
    );

    this.excluseColabs(this.idSelectedUser);
    this._userService.findColabs(this.idSelectedUser).subscribe((response) => {
      this.colabsList = response;
      //console.log("Seleccionados:" ,this.colabsList);
      //console.log(this.idSelectedUser);
    });
    
      
  }

  selectedProyectEdit(item){
    console.log(item);
    this.equipoCopy.id_proyecto = item.id_proyecto;
    this.equipoCopy.nombre_proyecto = item.nombre;
    this.closeModalEditProyectos();
  }

  dismiss() {
    this.ref.close();
  }

  dismissClear(){
    this.ref.close();
  }

  dismissEdit(){
    this.dialgoEditList.close();
  }

  dissmissEditProyect(){
  this.dialogoEditProyectos.close();
  this.nameProyect = "";
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
    this.modalProyectos = this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  closeModalProyectos(){
    this.modalProyectos.close();
  }

  dialogEditProyectos(dialog: TemplateRef<any>) {
    this.modalEditProyectos = this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  closeModalEditProyectos(){
    this.modalEditProyectos.close();
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
    const index = this.colabs.findIndex(colabs => colabs.id_colab === id);
    //
    //console.log(id, 'es de tipo ', typeof(id)); number
    //console.log(index);
    // Si el usuario se encuentra en el array, elimínalo usando splice()
    if (index !== -1) {
      this.colabs.splice(index, 1);
      console.log('Usuario eliminado:', id);
    }
    //contador de usuarios
    this.countUsers = numerosArray.length;
    //console.log(numerosArray);
    
    //console.log(this.usersText);
  }

  deleteSelectedUsers(id_user){
    console.log(id_user, typeof(id_user));
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
    this.excluseColabs(this.idSelectedUser);
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
    this.colabsList = [];
    this.usersText = "";

      this._userService.getColaboradores().subscribe((response) => {
        this.colabs = response;
        //console.log(response);
    });

  }

  }

  selectedProyect(item){
    this.idSelectedProyect = item.id_proyecto;
    this.equipo.key_proyecto = this.idSelectedProyect;
    this.nameProyect = item.nombre;
    this.closeModalProyectos();
  }

  team(ids: string){
    if(ids !== ""){
      this._userService.findColabs(ids).subscribe((response) => {
        this.colabsList = response;
        //console.log("Seleccionados:" ,this.colabsList);
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
    this._userService.getColaboradores().subscribe((response) => {
      this.colabs = response;
      });
  }

  excluseColabs(ids){
    this._userService.excludeColabs(ids).subscribe((response) =>{
      this.colabs = response;
    })
  }

  deleteUserTable(id: number){
    const index = this.colabs.findIndex(colabs => colabs.id === id);
    //console.log("Aqui se ha borrado el numero:",id ," de " ,this.user);
    //console.log("valor de index: ",index);
  // Si el usuario se encuentra en el array, elimínalo usando splice()
  if (index !== -1) {
    this.colabs.splice(index, 1);
   //console.log('Usuario eliminado:', id);
  }
  }

  dialogEdit(dialogEidt: TemplateRef<any>) {
  this.modalEdit = this.dialogService.open(
      dialogEidt,
      { context: 'this is some additional data passed to dialog' });

  }

  closeModalEdit(){
    this.idSelectedUser = "";
    this.usersText = "";    
    this.recargarTablaUsers();
    this.colabsList = [];
    this.modalEdit.close();
  }

  next(){
    this.page ++;
    if(this.modalTable === false){
    this._userService.getPaginationEquipos(this.page).subscribe((response) => {
      if(response.length !== 0){
        this.myList = response;
      }else{
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
    this._userService.findEquipo(this.text, this.page).subscribe((response) => {
      if(response.length !== 0){
        this.myList2 = response;
      }else{
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
      this._userService.getPaginationEquipos(this.page).subscribe((response) => {
        if(response.length !== 0){
          this.myList = response;
        }else{
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
      this._userService.findEquipo(this.text, this.page).subscribe((response) => {
        if(response.length !== 0){
          this.myList2 = response;
        }else{
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

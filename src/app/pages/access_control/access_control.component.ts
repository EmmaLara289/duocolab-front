import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { Area } from '../../models/area';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-access_control',
  templateUrl: './access_control.component.html',
  styleUrls: ["./access_control.component.scss"]
})
export class AccessControlComponent implements OnInit {
  user: any;
  userMenu: any;
  userProyectos: any;
  areaCopy: any;
  id_area:string=null;
  areas: any=[];
  modalRegister = false;
  modalTable = false;
  myList2 : any;
  text: string = '';
  public identity;
  public status: string;
  myList: any=[];
  alert = false;
  alertUpdate = false;
  page = 1;
  modalName: any;
  modalAccess: any;
  modalProyecto: any;
  

  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient,
  private dialogService: NbDialogService,
  ) {
  //this.area= new Area('', '')
  }

  ngOnInit(){
  this._userService.getPaginationUsers(this.page).subscribe((response) => {
      this.myList = response;
    });
  }

  openModal(item ,dialog: TemplateRef<any>){
    this.modalAccessDialog(dialog);
    this.user = item;
    this.getUserMenu(item.id);
  }

  openModalProyectos(item, dialog: TemplateRef<any>){
    this.modalProyectoDialog(dialog);
    this.getUserProyectos(item.id);
    this.user = item;
  }

  modalProyectoDialog(dialog){
    this.modalProyecto = this.dialogService.open(dialog);
  }

  closeModalProyectoDialog(){
    this.modalProyecto.close();
    this.userProyectos = undefined;
  }

  getUserMenu(id_user){
    this._userService.getUserMenuGreed(id_user).subscribe((response) => {
        this.userMenu = response;
        console.log(response);
    })
  }

  getUserProyectos(id_user){
    this._userService.getAccessProyect(id_user).subscribe((response) => {
        this.userProyectos = response;
        console.log(response);
    })
  }

  modalAccessDialog(dialog: TemplateRef<any>){
    this.modalAccess = this.dialogService.open(dialog, {
        context: "this is some additional data passed to dialog",
    });
  }

  disablePath(item){
    const moduleUpdateArray = [
        {
          id_module_option: item.id_module,
          has_access: 0,
        },
      ];
      
      const moduleUpdateText = JSON.stringify(moduleUpdateArray);
      
      //console.log(moduleUpdateArray, " | ", typeof(moduleUpdateArray)); // Array | object
      //console.log(moduleUpdateText, " | ", typeof(moduleUpdateText)); // String | string
    this._userService.updateAccess(this.user.id, moduleUpdateArray).subscribe((response) => {
      item.has_access = 0;
      //this.getUserMenu(this.user.id);
    });
  }

  ablePath(item){
    const moduleUpdateArray = [
        {
          id_module_option: item.id_module,
          has_access: 1,
        },
      ];
      
      const moduleUpdateText = JSON.stringify(moduleUpdateArray);
      
      console.log(moduleUpdateArray, " | ", typeof(moduleUpdateArray)); // Array | object
      console.log(moduleUpdateText, " | ", typeof(moduleUpdateText)); // String | string
    this._userService.updateAccess(this.user.id, moduleUpdateArray).subscribe((response) => {
        item.has_access = 1;
    });
  }

  deniedAccessProyect(item){
    this._userService.deniedAccessProyect(this.user.id, item.id_proyecto).subscribe((response) =>{
      item.has_access = 0;
    });
  }

  authAccessProyect(item){
    this._userService.authAccessProyect(this.user.id, item.id_proyecto).subscribe((response) =>{
      item.has_access = 1;
    });
  }

  claseAlert(){
    this.alertUpdate = false;
    this.alert = false;
  }

  buscarAreas() {
    this._userService.findUsersName(this.text, this.page).subscribe((response) => {
      this.myList2 = response;
      this.modalTable = true;
      console.log(response);
    });
  }

  closeModal() {
    this.modalAccess.close();
    //this.area= new Area('', '');
  }

  next(){
    this.page ++;
    if(this.modalTable === false){
    this._userService.getPaginationUsers(this.page).subscribe((response) => {
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
    this._userService.findUsersName(this.text, this.page).subscribe((response) => {
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
      this._userService.getPaginationUsers(this.page).subscribe((response) => {
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
      this._userService.findUsersName(this.text, this.page).subscribe((response) => {
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

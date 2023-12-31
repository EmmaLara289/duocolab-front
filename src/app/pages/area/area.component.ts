import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Area } from '../../models/area';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ["./area.component.scss"]
})
export class AreaComponent implements OnInit {
	area: Area;
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
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient,
  private dialogService: NbDialogService,
  ) {
  this.area= new Area('', '')
  }

  ngOnInit(){
  this._userService.getPaginationAreas(this.page).subscribe((response) => {
      this.myList = response;
    });
  }

  registrarArea(){
  this._userService.registrarArea(this.area.nombre).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.closeModal();
          this.ngOnInit();
          //this.alert = true;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Guardado con éxito',
            showConfirmButton: false,
            timer: 1200
          });
        }
        
      },
      error => {
        Swal.fire('UPS', 'El area no se ha podido registrar.', 'error');
        this.status = 'error';
      	}
   	);
	}

  updateArea(){
  this._userService.updateArea(this.areaCopy.id_area, this.areaCopy.nombre).subscribe(
      response => {
      if(response.status != 'error'){
        this.status = 'success';
        this.closeModal();
        this.ngOnInit();
        //this.alertUpdate = true;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        });
        }
        
      },
      error => {
        Swal.fire('UPS', 'El area no se ha podido registrar.', 'error');
        this.status = 'error';
        }
    );
  }

  claseAlert(){
    this.alertUpdate = false;
    this.alert = false;
  }

  buscarAreas() {
    this._userService.findArea(this.text, this.page).subscribe((response) => {
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
    this.areaCopy = {...item}
    this.modalUpdate(dialog);
    /*this.id_area = id_area;
    this.area = { ...this.myList.find(item => item.id_area === id_area) };
    console.log(this.id_area);*/
  }
  
  modalUpdate(dialog: TemplateRef<any>) {
    this.modalName = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  closeModal() {
    this.modalName.close();
    this.area= new Area('', '');
  }

  next(){
    this.page ++;
    if(this.modalTable === false){
    this._userService.getPaginationAreas(this.page).subscribe((response) => {
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
    this._userService.findArea(this.text, this.page).subscribe((response) => {
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
      this._userService.getPaginationAreas(this.page).subscribe((response) => {
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
      this._userService.findArea(this.text, this.page).subscribe((response) => {
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

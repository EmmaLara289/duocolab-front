import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Area } from '../../models/area';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';
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
  modalUpdate = false;
  modalTable = false;
  myList2 : any;
  text: string = '';
  public identity;
  public status: string;
  myList: any=[];
  alert = false;
  alertUpdate = false;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient
  ) {
  this.area= new Area('', '')
  }

  ngOnInit(){
  this._userService.getAreas().subscribe((response) => {
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
          this.alert = true;
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
        this.alertUpdate = true;
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
    this._userService.findArea(this.text).subscribe((response) => {
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
    this.areaCopy = {...item}
    /*this.id_area = id_area;
    this.area = { ...this.myList.find(item => item.id_area === id_area) };
    console.log(this.id_area);*/
  }



  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    this.area= new Area('', '');
  }

}

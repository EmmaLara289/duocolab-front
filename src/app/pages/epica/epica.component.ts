import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Epica } from '../../models/epica';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-epica',
  templateUrl: './epica.component.html',
  styleUrls: ["./epica.component.scss"]
})

export class EpicaComponent implements OnInit {
  public identity;
  public status: string;
  epicas: any=[];
  termino: string;
  myList: any=[];
  epica: Epica;
  modalRegister = false;
  id_epica:string=null;
  modalUpdate = false;
  alert = false;
  alertUpdate = false;

  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient

  ) { 
  this.epica = new Epica('','','','');
  }

  ngOnInit(){
  this._userService.getEpicas().subscribe((response) => {
      this.myList = response;
      console.log(this.myList);
    });
  }

  registrarEpica(){
  this._userService.registrarEpica(this.epica.nombre, this.epica.proyecto, this.epica.descripcion).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        this.alert = true;
        this.clearData();
        }

      },
      error => {
        Swal.fire('UPS', 'La epica no se ha podido registrar.', 'error');
      }
   		);
	}

  updateEpica(){
  this._userService.updateEpica(this.epica.id_epica, this.epica.nombre, this.epica.proyecto, this.epica.descripcion).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        this.alertUpdate = true;
        this.clearData();
        this.closeModal();
        }

      },
      error => {
        Swal.fire('UPS', 'La epica no se ha podido registrar.', 'error');
        this.status = 'error';
      }
      );
  }

  buscarEpicas() {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/searchEpicas?text=${this.termino}`)
      .subscribe(epicas => {
        this.epicas = epicas;
      });
  }

  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(id_epica) {
    this.modalUpdate = true;
    this.id_epica = id_epica;
    this.epica = { ...this.myList.find(item => item.id_epica === id_epica) };
    console.log(this.id_epica);
  }



  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    this.clearData();
  }

  clearData(){
    this.epica = new Epica('','','','');
  }

  closeAlert(){
    this.alertUpdate = false;
    this.alert = false;
  }

}

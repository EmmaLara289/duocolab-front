import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Prioridad } from '../../models/prioridad';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.component.html',
  styleUrls: ["./prioridad.component.scss"]
})

export class PrioridadComponent implements OnInit {
  public identity;
  id_prioridad: string=null;
  public status: string;
  prioridad: Prioridad;
  prioridades: any=[];
  modalRegister = false;
  modalUpdate = false;
  termino: string;
  myList: any=[];
  isOpen = false;
  alert = false;
  alertUpdate = false;
  prioridadCopy: any;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient

  ) { 
  this.prioridad = new Prioridad('','');
  }

  ngOnInit(){
  this._userService.getPrioridades().subscribe((response) => {
      this.myList = response;
    });
  }

  registrarPrioridad(){
  this._userService.registrarPrioridad(this.prioridad.nombre).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        this.alert = true;
        this.clearData();
        this.closeModal();
        }

      },
      error => {
        Swal.fire('UPS', 'El prioridad no se ha podido registrar.', 'error');
        this.status = 'error';
      }
   		);
	}

  updatePrioridad(){
  this._userService.updatePrioridad(this.prioridadCopy.id_prioridad, this.prioridadCopy.nombre).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        this.alertUpdate = true;
        this.clearData();
        this.closeModal();
        }

      },
      error => {
        Swal.fire('UPS', 'El prioridad no se ha podido registrar.', 'error');
        this.status = 'error';
      }
      );
  }

  buscarPrioridades() {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/searchPrioridades?text=${this.termino}`)
      .subscribe(prioridades => {
        this.prioridades = prioridades;
      });
  }


  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(item) {
    this.modalUpdate = true;
    this.prioridadCopy = {...item};
    /*this.id_prioridad = id_prioridad;
    this.prioridad = { ...this.myList.find(item => item.id_prioridad ===id_prioridad) };
    console.log(this.id_prioridad);*/
  }



  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
  }
  
  closeAlert(){
    this.alert = false;
    this.alertUpdate = false;
  }

  clearData(){
  this.prioridad = new Prioridad('','');
  }


}

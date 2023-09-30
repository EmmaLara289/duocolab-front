import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Proyecto } from '../../models/proyecto';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ["./proyecto.component.scss"]
})
export class ProyectoComponent implements OnInit {
  @ViewChild('registrarProyectoForm') registrarProyectoForm: NgForm;

	proyecto : Proyecto;
  proyectoCopy: any;
  myList: any= [];
  modalRegister = false;
  modalUpdate = false;
  termino: string;
  proyectos: any= [];
	public identity;
  id_proyecto: string = null;
	public status: string;
  alert = false;
  alertUpdate = false;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient
  ) {
  this.proyecto= new Proyecto('', '','', '','')
  }

  ngOnInit() {
  this._userService.getProyectos().subscribe((response) => {
      this.myList = response;
    });
  }

  registrarProyecto(){
  this._userService.registrarProyecto(this.proyecto.nombre, this.proyecto.key_equipo, this.proyecto.imagen, this.proyecto.detalles).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        this.alert = true;
        this.clearData();
        this.closeModal();
        }

      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
        this.status = 'error';
      	}
   	);
	}

  updateProyecto(){
  this._userService.updateProyecto(this.proyectoCopy.id_proyecto, this.proyectoCopy.nombre, this.proyectoCopy.key_equipo, this.proyectoCopy.imagen, this.proyectoCopy.detalles).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        this.alertUpdate = true;
        this.clearData();
        this.closeModal();
        }

      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
        this.status = 'error';
        }
    );
  }

  buscarProyectos() {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/searchProyectos?text=${this.termino}`)
      .subscribe( proyectos => {
        this.proyectos = proyectos;
      });
  }

  openModal() {
  this.modalRegister = true;
  
  }

openModalUpdate(item){
  this.modalUpdate = true;
  this.proyectoCopy = {...item};
  /*this.id_proyecto = id_proyecto;
  this.proyecto = { ...this.myList.find(item => item.id_proyecto === id_proyecto) };
  console.log(this.id_proyecto);*/
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

  clearData(){
    this.proyecto= new Proyecto('', '','', '','');
  }


}

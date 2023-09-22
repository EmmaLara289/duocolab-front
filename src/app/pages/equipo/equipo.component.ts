import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Equipo } from '../../models/equipo';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  //styleUrls: ["./equipo.component.css"]
})

export class EquipoComponent implements OnInit {
  @ViewChild('registrarEquipoForm') registrarEquipoForm: NgForm;

  id_equipo: string = null;

  public identity;
  public status: string;
  modalRegister = false;
  modalUpdate = false;
  equipo: Equipo;
  equipos: any=[];
  termino: string;
  myList: any=[];
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient

  ) { 
  this.equipo = new Equipo('','','','');
  }

  ngOnInit(){
  this._userService.getEquipos().subscribe((response) => {
      this.myList = response;
    });
  }

  registrarEquipo(form){
  this._userService.registrarEquipo(this.equipo.nombre, this.equipo.key_proyecto, this.equipo.key_colab).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.identity = response.equipo;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Ingreso realizado con éxito', 'success');
          this._router.navigate(['/registrar-equipo']);
        }

      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
        this.status = 'error';
      }
   		);
	}

  updateEquipo(form){
  this._userService.updateEquipo(this.equipo.id_equipo, this.equipo.nombre, this.equipo.key_proyecto, this.equipo.key_colab).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.identity = response.equipo;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Registro realizado con éxito', 'success');
          this._router.navigate(['/registrar-equipo']);
        }

      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
        this.status = 'error';
      }
      );
  }

  buscarEquipos() {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/searchEquipos?text=${this.termino}`)
      .subscribe(equipos => {
        this.equipos = equipos;
      });
  }

  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(id_equipo) {
    this.modalUpdate = true;
    this.id_equipo = id_equipo;
    this.equipo = { ...this.myList.find(item => item.id_equipo ===        id_equipo) };
    console.log(this.id_equipo);
  }

  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    console.log('Modal cerrado');
  }




}

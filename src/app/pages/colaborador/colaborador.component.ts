import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Colaborador } from '../../models/colaborador';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ["./colaborador.component.scss"]
})
export class ColaboradorComponent implements OnInit {
	colaborador: Colaborador;
  modalRegister = false;
  modalUpdate = false;
  id_colab: string=null;
	public identity;
	public status: string;
  colaboradores: any=[];
  termino: string;
  myList: any=[];
  alertUpdate = false;
  alert = false;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient
  ) {
  this.colaborador= new Colaborador('', '','', '','','')
  }

  ngOnInit(){
  this._userService.getColaboradores().subscribe((response) => {
      this.myList = response;
    });
  }

  registrarColaborador(){
  this._userService.registrarColaborador(this.colaborador.nombre, this.colaborador.telefono, this.colaborador.foto, this.colaborador.github, this.colaborador.correo).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.alert = true;
          this.ngOnInit();
        }
  
      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
        this.status = 'error';
      	}
   	);
	}

  updateColaborador(){
  this._userService.updateColaborador(this.colaborador.id_colab, this.colaborador.nombre, this.colaborador.telefono, this.colaborador.foto, this.colaborador.github, this.colaborador.correo).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.alertUpdate = true;
          this.ngOnInit();
        }
  
      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
        this.status = 'error';
        }
    );
  }

  buscarColaboradores() {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/searchColaboradores?text=${this.termino}`)
      .subscribe(colaboradores => {
        this.colaboradores = colaboradores;
      });
  }

  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(id_colab) {
    this.modalUpdate = true;
    this.id_colab = id_colab;
    this.colaborador = { ...this.myList.find(item => item.id_colab === id_colab) };
    console.log(this.id_colab);
  }



  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    console.log('Modal cerrado');
  }

}

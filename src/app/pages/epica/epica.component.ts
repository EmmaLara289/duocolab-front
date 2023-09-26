import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Epica } from '../../models/epica';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';
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
    });
  }

  registrarEpica(form){
  this._userService.registrarEpica(this.epica.nombre, this.epica.proyecto, this.epica.descripcion).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.identity = response.epica;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Ingreso realizado con éxito', 'success');
          this._router.navigate(['/']);
        }

      },
      error => {
        Swal.fire('UPS', 'La epica no se ha podido registrar.', 'error');
        this.status = 'error';
      }
   		);
	}

  updateEpica(form){
  this._userService.updateEpica(this.epica.id_epica, this.epica.nombre, this.epica.proyecto, this.epica.descripcion).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.identity = response.epica;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Ingreso realizado con éxito', 'success');
          this._router.navigate(['/']);
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
    console.log('Modal cerrado');
  }


}

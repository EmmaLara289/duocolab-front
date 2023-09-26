import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstatusTarea } from '../../models/estatus_tarea';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estatus_tarea',
  templateUrl: './estatus_tarea.component.html',
  styleUrls: ["./estatus_tarea.component.css"]
})

export class EstatusTareaComponent implements OnInit {
  public identity;
  modalRegister = false;
  modalUpdate = false;

  id_estatus:string=null;

  
  public status: string;
  estatus: any=[];
  termino: string;
  myList: any=[];
  estatustarea: EstatusTarea;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient

  ) { 
  this.estatustarea = new EstatusTarea('','');
  }

  ngOnInit(){
  this._userService.getEstatusTareas().subscribe((response) => {
      this.myList = response;
    });
  }

  registrarEstatusTarea(form){
  this._userService.registrarEstatusTarea(this.estatustarea.nombre).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.identity = response.estatustarea;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Ingreso realizado con éxito', 'success');
          this._router.navigate(['/']);
        }

      },
      error => {
        Swal.fire('UPS', 'El estatustarea no se ha podido registrar.', 'error');
        this.status = 'error';
      }
   		);
	}

  updateEstatusTarea(form){
  this._userService.updateEstatusTarea(this.estatustarea.id_estatus, this.estatustarea.nombre).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.identity = response.estatustarea;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Ingreso realizado con éxito', 'success');
          this._router.navigate(['/']);
        }

      },
      error => {
        Swal.fire('UPS', 'El estatustarea no se ha podido registrar.', 'error');
        this.status = 'error';
      }
      );
  }

  buscarEstatusTareas() {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/searchEstatusTareas?text=${this.termino}`)
      .subscribe(estatus => {
        this.estatus = estatus;
      });
  }

  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(id_estatus) {
  this.modalUpdate = true;
  this.id_estatus = id_estatus;
  this.estatustarea = { ...this.myList.find(item => item.id_estatus === id_estatus) };
  console.log(this.id_estatus);
  }

  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    console.log('Modal cerrado');
  }


}

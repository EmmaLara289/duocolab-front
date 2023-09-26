import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Tarea } from '../../models/tarea';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ["./tarea.component.scss"]
})

export class TareaComponent {
  public identity;
  public status: string;
  tareas: any=[];
  termino: string;
  myList: any=[];
  tarea: Tarea;
  modalRegister = false;
  id_tarea:string=null;
  modalUpdate = false;

  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient

  ) { 
  this.tarea = new Tarea('','','','','','','');
  }

  ngOnInit(){
  this._userService.getTareas().subscribe((response) => {
      this.myList = response;
    });
  }

  registrarTarea(form){
  this._userService.registrarTarea(this.tarea.nombre, this.tarea.descripcion, this.tarea.key_epica, this.tarea.key_sprint, this.tarea.key_proyecto, this.tarea.key_colaborador).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.identity = response.tarea;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Ingreso realizado con éxito', 'success');
          this._router.navigate(['/']);
        }

      },
      error => {
        Swal.fire('UPS', 'La tarea no se ha podido registrar.', 'error');
        this.status = 'error';
      }
   		);
	}

  updateTarea(form){
  this._userService.updateTarea(this.tarea.id_tarea, this.tarea.nombre, this.tarea.descripcion, this.tarea.key_epica, this.tarea.key_sprint, this.tarea.key_proyecto, this.tarea.key_colaborador).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.identity = response.tarea;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Ingreso realizado con éxito', 'success');
          this._router.navigate(['/']);
        }

      },
      error => {
        Swal.fire('UPS', 'La tarea no se ha podido registrar.', 'error');
        this.status = 'error';
      }
      );
  }

  buscarTareas() {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/searchTareas?text=${this.termino}`)
      .subscribe(tareas => {
        this.tareas = tareas;
      });
  }

  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(id_tarea) {
    this.modalUpdate = true;
    this.id_tarea = id_tarea;
    this.tarea = { ...this.myList.find(item => item.id_tarea === id_tarea) };
    console.log(this.id_tarea);
  }



  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    console.log('Modal cerrado');
  }


  
}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstatusTarea } from '../../models/estatus_tarea';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CheckUser } from '../../services/checkUser';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-mis-tareas',
  templateUrl: './mis-tareas.component.html',
  styleUrls: ['./mis-tareas.component.scss']
})
export class MisTareasComponent implements OnInit {
  myList : any;
  myList2: any;
  modalTable = false;
  page = 1;
  modalReport: any;
  descripcion_update: string = "";
  id_tarea: any;
  text = "";
  constructor(
    private _userService: UserService,
    private CheckUser: CheckUser,
    private _router: Router,
    private http: HttpClient,
   private dialogService: NbDialogService
  ) { }

  ngOnInit(){
    this.CheckUser.userData = JSON.parse(localStorage.getItem('userData'));
    this._userService.getPaginationTareaColab(this.CheckUser.userData.id, this.page).subscribe((response) => {
        this.myList = response;
      });
    }

    openModal(item ,dialog: TemplateRef<any>){
      this.modalUpdate(dialog);
      this.id_tarea = item;
    }

    buscarTareas() {
      this._userService.searchPaginationTareaColab(this.CheckUser.userData.id, this.page, this.text).subscribe((response) => {
        this.myList2 = response;
        this.modalTable = true;
        console.log(response);
      });
    }

    modalUpdate(dialog: TemplateRef<any>) {
      this.modalReport = this.dialogService.open(dialog, {
        context: "this is some additional data passed to dialog",
      });
    }

    closeModal(){
      this.modalReport.close();
    }
  
    createHistorial(){
      this._userService.createHistorial(this.id_tarea, this.descripcion_update).subscribe((response) =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        });
        this.closeModal();
      })
    }

    next(){
      this.page ++;
      if(this.modalTable === false){
      this._userService.getPaginationTareaColab(this.CheckUser.userData.id, this.page).subscribe((response) => {
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
      /*this._userService.findTarea(this.text, this.page).subscribe((response) => {
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
      });*/
    }
    }

    preview(){
      if(this.page > 1){
        this.page --;
        if(this.modalTable === false){
        this._userService.getPaginationTareaColab(this.CheckUser.userData.id, this.page).subscribe((response) => {
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
      }else{/*
        this._userService.findTarea(this.text, this.page).subscribe((response) => {
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
        });*/
      }
    }
    }
}

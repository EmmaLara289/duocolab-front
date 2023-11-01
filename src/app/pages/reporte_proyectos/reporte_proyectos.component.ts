import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { Area } from '../../models/area';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { global } from '../../services/global';

@Component({
  selector: 'new',
  templateUrl: './reporte_proyectos.component.html',
  styleUrls: ["./reporte_proyectos.component.scss"]
})
export class ReporteProyectosComponent implements OnInit  {
  myList: any;
  myList2: any;
  text = "";
  listColabs: any;
  modalColabs: any;
  modalTable = false;
  page = 1;
  link = "";
  constructor(
    private _userService: UserService,
    private _router: Router,
    private http: HttpClient,
    private dialogService: NbDialogService,
    ) {}

    ngOnInit(){
      this._userService.getPaginationProyectos(this.page).subscribe((response) => {
        this.myList = response;
        console.log(this.myList);
      });
    }

    buscarProyecto(){
      this._userService.findProyecto(this.text, this.page).subscribe((response) => {
        this.myList2 = response;
        this.modalTable = true;
      });
    }

    openUser(item, dialog: TemplateRef<any>){
      this.listColabs = item.colaboradores;
      console.log(this.modalColabs);
      this.openModalColabs(dialog);
    }

    openModalColabs(dialog: TemplateRef<any>){
      this.modalColabs = this.dialogService.open(
        dialog,
        { context: 'this is some additional data passed to dialog' });
    }

    closeModalColabs(){
      this.modalColabs.close();
    }

    excelReport(item){
    // Ahora `fileName` contiene el nombre del archivo
    this.link = global.url + 'ExportTareasProyecto?key_proyecto=' + item;
    console.log(this.link);
    //window.location.href = "";
    const downloadLink = document.createElement('a');
    downloadLink.href = this.link;
    downloadLink.download = 'nombre-archivo.xlsx'; // Puedes establecer el nombre del archivo aquí
    document.body.appendChild(downloadLink); // Añade el enlace al DOM
    downloadLink.click(); // Haz clic en el enlace para iniciar la descarga
    document.body.removeChild(downloadLink); // Elimina el enlace del DOM después de la descarga
    }

    next(){
      this.page ++;
      if(this.modalTable === false){
      this._userService.getPaginationProyectos(this.page).subscribe((response) => {
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
      this._userService.findProyecto(this.text, this.page).subscribe((response) => {
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
      });
    }
    }


    preview(){
      if(this.page > 1){
        this.page --;
        if(this.modalTable === false){
        this._userService.getPaginationProyectos(this.page).subscribe((response) => {
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
        this._userService.findProyecto(this.text, this.page).subscribe((response) => {
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
        });
      }
    }
    }








}
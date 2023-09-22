import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Area } from '../../models/area';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  //styleUrls: ["./area.component.css"]
})
export class AreaComponent implements OnInit {
	area: Area;
  id_area:string=null;
  areas: any=[];
  modalRegister = false;
  modalUpdate = false;
  termino: string;
  public identity;
  public status: string;
  myList: any=[];
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient
  ) {
  this.area= new Area('', '')
  }

  ngOnInit(){
  this._userService.getAreas().subscribe((response) => {
      this.myList = response;
    });
  }

  registrarArea(form){
  this._userService.registrarArea(this.area.nombre).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.identity = response.proyecto;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Registro realizado con éxito', 'success');
          this._router.navigate(['/registrar-area']);
        }
        
      },
      error => {
        Swal.fire('UPS', 'El area no se ha podido registrar.', 'error');
        this.status = 'error';
      	}
   	);
	}

  updateArea(form){
  this._userService.updateArea(this.area.id_area, this.area.nombre).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
          this.identity = response.proyecto;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Registro realizado con éxito', 'success');
          this._router.navigate(['/registrar-area']);
        }
        
      },
      error => {
        Swal.fire('UPS', 'El area no se ha podido registrar.', 'error');
        this.status = 'error';
        }
    );
  }

  buscarAreas() {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/searchAreas?text=${this.termino}`)
      .subscribe(areas => {
        this.areas = areas;
      });
  }

  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(id_area) {
    this.modalUpdate = true;
    this.id_area = id_area;
    this.area = { ...this.myList.find(item => item.id_area === id_area) };
    console.log(this.id_area);
  }



  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    console.log('Modal cerrado');
  }

}

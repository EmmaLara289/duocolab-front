import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from '../../models/proyecto';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ["./proyecto.component.scss"]
})
export class ProyectoComponent implements OnInit {
  @ViewChild('EquipoAuto') autoEquipo: ElementRef;

	proyecto : Proyecto;
  proyectoCopy: any;
  myList: any= [];
  modalRegister = false;
  modalUpdate = false;
  text: string = '';
  proyectos: any= [];
	public identity;
  id_proyecto: string = null;
	public status: string;
  alert = false;
  alertUpdate = false;
  myList2: any;
  modalTable: any;
  form: FormGroup;
  proyectoList: any;
  filteredEquipos: Observable<string[]>;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient,
  private fb: FormBuilder,
  ) {
  this.proyecto= new Proyecto('', '','', '','');

  this.form = this.fb.group({
    equipo: ['']
  });

  }

  private _filterE(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.proyectoList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  onChange($event) {
    const selectedOption = $event;
    console.log('el valor: ',$event)
    
  }
  
  onSelectionChange($event) {
    const selectedName = $event;
    const selectedOption = this.proyectoList.find(option => option.nombre === selectedName);
    console.log($event);
    //this.nameEpica = 
    //this.tarea.key_sprint = selectedOption.id_epica;
  }

  ngOnInit() {
  this._userService.getEquipos().subscribe((response) => {
      this.proyectoList = response;
      this.filteredEquipos = this.form.get('equipo').valueChanges.pipe(
        startWith(''),
        map(value => this._filterE(value))
      );
    });

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
    this._userService.findProyecto(this.text).subscribe((response) => {
      this.myList2 = response;
      this.modalTable = true;
      console.log(response);
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

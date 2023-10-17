import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Epica } from '../../models/epica';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-epica',
  templateUrl: './epica.component.html',
  styleUrls: ["./epica.component.scss"]
})

export class EpicaComponent implements OnInit {
  
  @ViewChild('ProyectAuto') autoProyect: ElementRef;
  filtredProyects: Observable<string[]>;
  form: FormGroup;

  public identity;
  public status: string;
  epicas: any=[];
  text: string = '';
  myList: any=[];
  epica: Epica;
  myList2: any;
  modalTable: any;
  modalRegister = false;
  id_epica:string=null;
  modalUpdate = false;
  alert = false;
  alertUpdate = false;
  epicaCopy: any;
  proyectoList: any;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient,
  private fb: FormBuilder,

  ) { 
  this.epica = new Epica('','','','');

  this.form = this.fb.group({
    proyecto: ['']
  });
  }

  private _filterP(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.proyectoList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  onChangeProyect($event) {
    console.log('el valor: ',$event);
    //this.filtredProyects$ = this.getFilteredOptionsProyect(this.autoProyect.nativeElement.value);
  }
  
  onProyectSelected(item) {
    console.log(item);
    this.epica.proyecto = item;
    // Aquí puedes hacer lo que necesites con el objeto completo de la opción seleccionada
  }


  ngOnInit(){
  this._userService.getEpicas().subscribe((response) => {
      this.myList = response;
      console.log(this.myList);
    });

    this._userService.getProyectos().subscribe((response) => {
      this.proyectoList = response;
      this.filtredProyects = this.form.get('proyecto').valueChanges.pipe(
        startWith(''),
        map(value => this._filterP(value))
      );
      //console.log("Proyectos: ",response);
    });
  }

  registrarEpica(){
  this._userService.registrarEpica(this.epica.nombre, this.epica.proyecto, this.epica.descripcion).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        this.alert = true;
        this.clearData();
        }

      },
      error => {
        Swal.fire('UPS', 'La epica no se ha podido registrar.', 'error');
      }
   		);
	}

  updateEpica(){
  this._userService.updateEpica(this.epicaCopy.id_epica, this.epicaCopy.nombre, this.epicaCopy.proyecto, this.epicaCopy.descripcion).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        this.alertUpdate = true;
        this.clearData();
        this.closeModal();
        }

      },
      error => {
        Swal.fire('UPS', 'La epica no se ha podido registrar.', 'error');
        this.status = 'error';
      }
      );
  }

  buscarEpicas() {
    this._userService.findEpica(this.text).subscribe((response) => {
      this.myList2 = response;
      this.modalTable = true;
      console.log(response);
    });
  }

  openModal() {
  this.modalRegister = true;
  
  }

  openModalUpdate(item) {
    this.modalUpdate = true;
    this.epicaCopy = {...item};
    /*this.id_epica = id_epica;
    this.epica = { ...this.myList.find(item => item.id_epica === id_epica) };
    console.log(this.id_epica);*/
  }



  closeModal() {
    this.modalRegister = false;
    this.modalUpdate = false;
    this.clearData();
  }

  clearData(){
    this.epica = new Epica('','','','');
  }

  closeAlert(){
    this.alertUpdate = false;
    this.alert = false;
  }

}

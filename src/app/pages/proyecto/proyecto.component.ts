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

  fotoAlert = true;
  keyFoto: any;
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
  modalTable = false;
  form: FormGroup;
  equipoList: any;
  filteredEquipos: Observable<string[]>;
  page = 1;
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
    return this.equipoList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  onChange($event) {
    const selectedOption = $event;
    console.log('el valor: ',$event)
    
  }
  
  onSelectionChange($event) {
    const selectedName = $event;
    const id = this.equipoList.find(option => option.nombre === selectedName);
    console.log(id);
    this.proyecto.key_equipo = id.id_equipo;
  }

  ngOnInit() {
  this._userService.getEquipos().subscribe((response) => {
      this.equipoList = response;
      this.filteredEquipos = this.form.get('equipo').valueChanges.pipe(
        startWith(''),
        map(value => this._filterE(value))
      );
    });

    this._userService.getPaginationProyectos(this.page).subscribe((response) => {
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
    this.page = 1;
    this._userService.findProyecto(this.text, this.page).subscribe((response) => {
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

  next(){
    this.page ++;
    if(this.modalTable === false){
    this._userService.getPaginationProyectos(this.page).subscribe((response) => {
      if(response.length !== 0){
        this.myList = response;
      }else{
        this.page--;
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
        this.page--;
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
          this.page--;
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
          this.page--;
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

  foto(files: FileList){
    this.handleFileInput(files);
    this.handleFileInputURL(files);
  }
  
  handleFileInput(files: FileList) {
    this.proyecto.imagen = files.item(0);
    console.log(this.proyecto.imagen);
    this.fotoAlert = false;
  }

  handleFileInputURL(files: FileList) {
    const file = files.item(0);
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const dataUrl = e.target.result as string;
  
        // Generar una clave única para identificar la imagen en localStorage
        const uniqueKey = 'foto_' + new Date().getTime();
  
        // Guardar la URL de datos en localStorage
        localStorage.setItem(uniqueKey, dataUrl);
  
        // Almacena la clave única en tu objeto colaborador
        this.keyFoto = uniqueKey;
      };
  
      reader.readAsDataURL(file);
    }
  }

  getFotoUrl() {
    // Obtén la clave única almacenada en this.colaborador.fotoKey
    const uniqueKey = this.keyFoto;
  
    if (uniqueKey) {
      // Obtén la URL de datos desde localStorage
      const dataUrl = localStorage.getItem(uniqueKey);
  
      // Devuelve la URL de datos
      return dataUrl;
    }
  
    // Si no hay clave única, devuelve una URL de imagen predeterminada o una URL vacía según tu necesidad
    return 'URL_de_imagen_predeterminada.jpg'; // Cambia esto según tu caso
  }

}

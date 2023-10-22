import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from '../../models/proyecto';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { global } from '../../services/global';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ["./proyecto.component.scss"]
})
export class ProyectoComponent implements OnInit {
  @ViewChild('EquipoAuto') autoEquipo: ElementRef;
  @ViewChild('EquipoModalAuto') autoEquipoModal: ElementRef;
  filteredEquipos: Observable<string[]>;
  filteredEquiposModal: Observable<string[]>;

  fotoAlert = true;
  fotoAlertUpdate = true;
  keyFoto: any;
	proyecto : Proyecto;
  proyectoCopy: any;
  myList: any= [];
  modalRegister = false;
  modalUpdate : any;
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
  page = 1;
  modalDescription: any;
  url: any;
  getFotoUrlAddress: any;
  modalImagen: any;
  image: any;
  detalles_proyecto: string = "";
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  ) {
  this.proyecto= new Proyecto('', '','', '','');
  this.url = global.url;

  this.form = this.fb.group({
    equipo: [''],
    equipoModal: ['']
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
  
  private _filterEM(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.equipoList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  onChangeModal($event) {
    const selectedOption = $event;
    console.log('el valor: ',$event);
  }

  onSelectionModalChange($event) {
    const selectedName = $event;
    const id = this.equipoList.find(option => option.nombre === selectedName);
    console.log(id);
    this.proyectoCopy.key_equipo = id.id_equipo;
  }

  ngOnInit() {
  this._userService.getEquipos().subscribe((response) => {
      this.equipoList = response;
      this.filteredEquipos = this.form.get('equipo').valueChanges.pipe(
        startWith(''),
        map(value => this._filterE(value))
      );
      this.filteredEquiposModal = this.form.get('equipoModal').valueChanges.pipe(
        startWith(''),
        map(value => this._filterEM(value))
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        });
        this.clearData();
        this.closeModal();
        this.form.reset();
        this.fotoAlert = true;
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
        this.reload();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        });
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

  openModalUpdate(item, dialog: TemplateRef<any>) {
    //this.modalUpdate = true;
    //this..equipoModal = item.nombre_equipo;
    this.form.patchValue({
      equipoModal: item.nombre_equipo // Asigna el valor predeterminado a equipoModal
    });
    
    this.proyectoCopy = {...item};
    this.modalUpdateDialog(dialog);
    this.getImagenUpdate(item);
  }

  modalUpdateDialog(dialog: TemplateRef<any>){
    this.modalUpdate = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });  
  }



  closeModal() {
    this.modalUpdate.close();
    this.clearData();
    this.form.reset();
  }

  closeAlert(){
    this.alert = false;
    this.alertUpdate = false;
  }

  clearData(){
    this.proyecto= new Proyecto('', '','', '','');
    this.keyFoto = "";
    this.fotoAlertUpdate = true;
    this.fotoAlert = true;
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
        sessionStorage.setItem(uniqueKey, dataUrl);
  
        // Almacena la clave única en tu objeto colaborador
        this.keyFoto = uniqueKey;
      };
  
      reader.readAsDataURL(file);
    }
  }

  fotoUpdate(files: FileList){
    this.handleFileInputUpdate(files);
    this.handleFileInputURLUpdate(files);
  }
  
  handleFileInputUpdate(files: FileList) {
    this.proyectoCopy.imagen = files.item(0);
    console.log(this.proyectoCopy.imagen);
    this.fotoAlertUpdate = false;
  }

  handleFileInputURLUpdate(files: FileList) {
    const file = files.item(0);

    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const dataUrl = e.target.result as string;
  
        // Generar una clave única para identificar la imagen en localStorage
        const uniqueKey = 'foto_' + new Date().getTime();
  
        // Guardar la URL de datos en localStorage
        sessionStorage.setItem(uniqueKey, dataUrl);
  
        // Almacena la clave única en tu objeto colaborador
        this.keyFoto = uniqueKey;
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  getFotoUrlUpdate() {
    // Obtén la clave única almacenada en this.colaborador.fotoKey
    const uniqueKey = this.keyFoto;
  
    if (uniqueKey) {
      // Obtén la URL de datos desde localStorage
      const dataUrl = sessionStorage.getItem(uniqueKey);
  
      // Devuelve la URL de datos
      return dataUrl;
    }
  
    // Si no hay clave única, devuelve una URL de imagen predeterminada o una URL vacía según tu necesidad
    return 'URL_de_imagen_predeterminada.jpg'; // Cambia esto según tu caso
  }

  getFotoUrl() {
    // Obtén la clave única almacenada en this.colaborador.fotoKey
    const uniqueKey = this.keyFoto;
  
    if (uniqueKey) {
      // Obtén la URL de datos desde localStorage
      const dataUrl = sessionStorage.getItem(uniqueKey);
  
      // Devuelve la URL de datos
      return dataUrl;
    }
  
    // Si no hay clave única, devuelve una URL de imagen predeterminada o una URL vacía según tu necesidad
    return 'URL_de_imagen_predeterminada.jpg'; // Cambia esto según tu caso
  }

  openModalDescription(dialog: TemplateRef<any>) {
    this.modalDescription = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  getImagen(dialog: TemplateRef<any>, item) {
    this.modalImage(dialog);
    this.image = item.imagen;
    this.detalles_proyecto = item.detalles;
    //this.detalles_proyecto = JSON.stringify(this.detalles_proyecto);
    console.log(this.detalles_proyecto, typeof(this.detalles_proyecto));
    this.getFotoUrlAddress = this.url.replace('/api/', '/');
    console.log(this.getFotoUrlAddress);
    //http://127.0.0.1:8000/storage/proyectos/50a78bb8fd562d556785e04ba87529de.jpg
  }

  getImagenUpdate(item) {
    this.image = item.imagen;
    this.detalles_proyecto = item.detalles;
    //this.detalles_proyecto = JSON.stringify(this.detalles_proyecto);
    console.log(this.detalles_proyecto, typeof(this.detalles_proyecto));
    this.getFotoUrlAddress = this.url.replace('/api/', '/');
    console.log(this.getFotoUrlAddress);
    //http://127.0.0.1:8000/storage/proyectos/50a78bb8fd562d556785e04ba87529de.jpg
  }

  modalImage(dialog: TemplateRef<any>){
    this.modalImagen = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  closeImagen(){
    this.modalImagen.close();
  }

  reload(){
    if(this.modalTable === false){
      this._userService.getPaginationProyectos(this.page).subscribe((response) => {
        this.myList = response;
      });
    }else{
      this._userService.findProyecto(this.text, this.page).subscribe((response) => {
        this.myList2 = response;
        this.modalTable = true;
        console.log(response);
      });
    }
  }

}

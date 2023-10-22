import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Colaborador } from '../../models/colaborador';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { global } from '../../services/global';


@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ["./colaborador.component.scss"]
})
export class ColaboradorComponent implements OnInit {
  private ref: NbDialogRef<any>;

	colaborador: Colaborador;
  fotoAlert = true;
  fotoAlertUpdate = true;
  modalRegister = false;
  id_colab: string=null;
	public identity;
	public status: string;
  colaboradores: any=[];
  text: string = '';
  myList: any=[];
  myList2: any=[];
  alertUpdate = false;
  alert = false;
  keyFoto: any;
  colaboradorCopy: any;
  global: any;
  getFotoUrlAddress: any;
  colaboradorUpdate: any= [];
  modalTable = false;
  modalUpdate: any;
  guardFoto: any;
  page = 1;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private http: HttpClient,
  private dialogService: NbDialogService,
  ) {
  this.colaborador= new Colaborador('', '','', '','','');
  this.global = global.url;
  }

  ngOnInit(){
  this._userService.getPaginationColaboradores(this.page).subscribe((response) => {
      this.myList = response;
    });
  }

  registrarColaborador(){
    console.log(typeof(this.colaborador.foto));
  this._userService.registrarColaborador(this.colaborador.nombre, this.colaborador.telefono, this.colaborador.foto, this.colaborador.github, this.colaborador.correo).subscribe(
      response => {
      if(response.status != 'error'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        })
          this.alert = true;
          this.ngOnInit();
          this.clearData();
        }
  
      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
        this.status = 'error';
      	}
   	);
	}

  updateColaborador(){
    console.log('si hay foto: ',this.colaboradorCopy.foto);
    console.log(typeof(this.colaboradorCopy.foto));
  this._userService.updateColaborador(this.colaboradorCopy.id_colab, this.colaboradorCopy.nombre, this.colaboradorCopy.telefono,this.colaboradorCopy.foto, this.colaboradorCopy.github, this.colaboradorCopy.correo).subscribe(
      response => {
      if(response.status != 'error'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        })
          this.ngOnInit();
          this.buscarColaboradores();
          this.clearData();
          this.closeModalUpdate();
        }
  
      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
        }
    );
  }

  disableColaborador(item){
    //console.log('disable');
    this._userService.disableColaborador(item.id_colab).subscribe((response) =>{
      console.log('Desactivado');
      this.ngOnInit();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Guardado con éxito',
        showConfirmButton: false,
        timer: 1200
      })
      this.buscarColaboradores();
    });
  }

  ableColaborador(item){
    //console.log('able');
    this._userService.ableColaborador(item.id_colab).subscribe((response) =>{
      console.log('Activado');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Guardado con éxito',
        showConfirmButton: false,
        timer: 1200
      })
      this.ngOnInit();
      this.buscarColaboradores();
    });
  }

  buscarColaboradores() {
    //this.page = 1;
    this._userService.findColaborador(this.text, this.page).subscribe((response) => {
      this.myList2 = response;
      this.modalTable = true;
      console.log(response);
    });
  }

  openModal() {
  this.modalRegister = true;
  }
  

  closeModalUpdate() {
    this.modalUpdate.close();
  }

  openModalUpdate(item, dialog: TemplateRef<any>){
    this.modalUpdate = this.dialogService.open(dialog, {
      context: "this is some",
    });
    this.colaboradorCopy = { ...item };
    this.guardFoto = item.foto;

    this.colaboradorUpdate = this.colaboradorCopy;
    console.log('item', item);
    //this.colaborador = { ...this.myList.find(item => item.id_colab === id_colab) };
    this.fotoAlertUpdate = this.colaboradorCopy.foto;
    this.getFotoUrlAddress = this.global.replace('/api/', '/');
    console.log(this.global);
    console.log('foto:',this.colaboradorCopy.foto);
    console.log('URL: ',this.getFotoUrlAddress);
    //this.get
    //http://127.0.0.1:8000/storage/colaboradores/50a78bb8fd562d556785e04ba87529de.jpg
  }

  foto(files: FileList){
    this.handleFileInput(files);
    this.handleFileInputURL(files);
  }

  fotoUpdate(files: FileList){
    this.handleFileInputUpdate(files);
    this.handleFileInputURLUpdate(files);
  }
  

  handleFileInput(files: FileList) {
    this.colaborador.foto = files.item(0);
    console.log(this.colaborador.foto);
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

  handleFileInputUpdate(files: FileList) {
    this.colaboradorCopy.foto = files.item(0);
    console.log('Listo');
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
  
  clearData(){
  this.colaborador= new Colaborador('', '','', '','','');
  this.fotoAlert = true;
  this.fotoAlertUpdate = true;
  this.keyFoto = "";
  }  

  closeAlert(){
    this.alert = false;
    this.alertUpdate = false;
  }

  next(){
    this.page ++;
    if(this.modalTable === false){
      this._userService.getPaginationColaboradores(this.page).subscribe((response) => {
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
    this._userService.findColaborador(this.text, this.page).subscribe((response) => {
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

    if(this.page > 1)
    {
      this.page --;
      if(this.modalTable === false)
      {
      this._userService.getPaginationColaboradores(this.page).subscribe((response) => 
      {
        if(response.length !== 0)
        {
          this.myList = response;
        }else
          {
            Swal.fire(
              {
              position: 'top-end',
              icon: 'error',
              title: 'No hay más resultados',
              showConfirmButton: false,
              timer: 1200
              })
          }
      });
    }else{
      this._userService.findColaborador(this.text, this.page).subscribe((response) => {
        if(response.length !== 0){
          this.myList2 = response;
        }else{
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

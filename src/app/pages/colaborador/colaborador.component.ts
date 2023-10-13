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
  this._userService.getColaboradores().subscribe((response) => {
      this.myList = response;
    });
  }

  registrarColaborador(){
  this._userService.registrarColaborador(this.colaborador.nombre, this.colaborador.telefono, this.colaborador.foto, this.colaborador.github, this.colaborador.correo).subscribe(
      response => {
      if(response.status != 'error'){
          this.status = 'success';
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
  this._userService.updateColaborador(this.colaboradorCopy.id_colab, this.colaboradorCopy.nombre, this.colaboradorCopy.telefono, this.colaboradorCopy.foto, this.colaboradorCopy.github, this.colaboradorCopy.correo).subscribe(
      response => {
      if(response.status != 'error'){
          this.alertUpdate = true;
          this.ngOnInit();
          this.clearData();
          this.buscarColaboradores();
        }
  
      },
      error => {
        Swal.fire('UPS', 'El equipo no se ha podido registrar.', 'error');
        }
    );
  }

  buscarColaboradores() {
    this._userService.findColaborador(this.text).subscribe((response) => {
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

    this.colaboradorUpdate = this.colaboradorCopy;
    console.log('item', item);
    //this.colaborador = { ...this.myList.find(item => item.id_colab === id_colab) };
    this.fotoAlertUpdate = this.colaboradorCopy.foto;
    this.getFotoUrlAddress = this.global.replace('/api/', '/');
    console.log(this.global);
    console.log('URL: ',this.getFotoUrlAddress);
    //this.get
    //http://127.0.0.1:8000/storage/colaboradores/50a78bb8fd562d556785e04ba87529de.jpg
  }

  foto(files: FileList){
    this.handleFileInput(files);
    this.handleFileInputURL(files);
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
  
  clearData(){
  this.colaborador= new Colaborador('', '','', '','','');
  this.fotoAlert = true;
  }  

  closeAlert(){
    this.alert = false;
    this.alertUpdate = false;
  }


}

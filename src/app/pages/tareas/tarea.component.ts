import { Component, TemplateRef, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from '../../models/tarea';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: "app-tarea",
  templateUrl: "./tarea.component.html",
  styleUrls: ["./tarea.component.scss"],
})
export class TareaComponent {
  private ref: NbDialogRef<any>;

  @ViewChild('EpicaAuto') autoEpica: ElementRef;
  @ViewChild('ProyectAuto') autoProyect: ElementRef;
  @ViewChild('SprintAuto') autoSprint: ElementRef;
  @ViewChild('AreatAuto') autoArea: ElementRef;
  @ViewChild('EpicasAuto') autosEpica: ElementRef;

  filteredEpicas: Observable<any[]>;
  filtredProyects: Observable<string[]>;
  filtredSprints: Observable<string[]>;
  filtredAreas: Observable<string[]>;

  public identity;
  selectedOption: any;
  public status: string;
  tareas: any = [];
  text: string = "";
  myList: any = [];
  myList2: any;
  modalTable = false;
  tarea: Tarea;
  modalRegister = false;
  id_tarea: string = null;
  modalUpdate: any;
  alertUpdate = false;
  alert = false;
  tareaCopy: any;
  epicaList: any;
  sprintList: any;
  proyectoList: any;
  colaboradorList: any;
  selectedColabList: any;
  idSelectedColabs = "";
  countColabs = 0;
  colabsText = "";
  modalColab: any;
  colabsSelected = [];
  modalProyect: any;
  idSelectedProyect = "";
  nameProyect = "";
  nameSprint = "";
  nameEpica = "";
  modalSprint: any;
  modalEpica: any;
  modalDescription: any;
  update: any;
  form: FormGroup;
  value: any;
  proyecto: any;
  page = 1;
  pageModal = 1;
  areasList: any;
  textModal = "";
  placeHolderSprint = "Seleccione un Proyecto";
  placeHolderEpica = "Seleccione un Proyecto";
  placeHolderColab = "Seleccione un Proyecto";
  constructor(
    private _userService: UserService,
    private _router: Router,
    private http: HttpClient,
    private dialogService: NbDialogService,
    private fb: FormBuilder,

  ) {
    this.tarea = new Tarea("", "", "", "", "", "", "", "");
    //this.tareaCopy = new Tarea('','','','','','','');
    
    this.form = this.fb.group({
      epica: [''],
      proyecto: [''],
      sprint: [''],
      area: ['']
      // FormControl para el input del usuario
    });

  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.epicaList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  private _filterP(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.proyectoList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  private _filterS(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.sprintList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  private _filterA(value: string): any[]{
    const filterValue = value.toLowerCase();
    return this.areasList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
        this._userService.getPaginationTareas(this.page).subscribe((response) => {
      this.myList = response;
    });

    this._userService.getProyectos().subscribe((response) => {
      this.proyectoList = response;
      this.filtredProyects = this.form.get('proyecto').valueChanges.pipe(
        startWith(''),
        map(value => this._filterP(value))
      );
      });
    
    this._userService.getAreas().subscribe((response) => {
      this.areasList = response;
      this.filtredAreas = this.form.get('area').valueChanges.pipe(
        startWith(''),
        map(value => this._filterA(value))
      );
    });
  }

  private filter(value: string, options: any[]): string[] {
    const filterValue = value.toLowerCase();
    return options
      .filter(option => option.nombre.toLowerCase().includes(filterValue))
      .map(option => option.nombre);
  }
  
  onChange($event) {
    const selectedOption = $event;
    console.log('el valor: ',$event)
    
  }
  
  onSelectionChange($event) {
    const selectedName = $event;
    const selectedOption = this.epicaList.find(option => option.nombre === selectedName);
    console.log($event);
    //this.nameEpica = 
    //this.tarea.key_sprint = selectedOption.id_epica;
  }

  onEpicaSelected(item) {
    const selectedOption = item;
    console.log(item);
    const id = this.epicaList.find(option => option.nombre === item);
    console.log('ID: ',id);
    this.tarea.key_epica = id.id_epica;
    // Aquí puedes hacer lo que necesites con el objeto completo de la opción seleccionada
  }

  onProyectSelected(item) {
    console.log(item);
    const id = this.proyectoList.find(option => option.nombre === item);
    console.log('ID: ',id);
    this.tarea.key_proyecto = id.id_proyecto;

    this._userService.sprintProyect(this.tarea.key_proyecto).subscribe((response) => {
      this.sprintList = response;
      this.filtredSprints = this.form.get('sprint').valueChanges.pipe(
        startWith(''),
        map(value => this._filterS(value))
      );
    });

    this._userService.epicaProyect(this.tarea.key_proyecto).subscribe((response) => {
      this.epicaList = response;
      this.filteredEpicas = this.form.get('epica').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

    
    this._userService.colabsProyect(this.pageModal, this.tarea.key_proyecto).subscribe((response) => {
      this.colaboradorList = response;
    });

    this.placeHolderSprint = "";
    this.placeHolderEpica = "";
    this.placeHolderColab = "";
    // Aquí puedes hacer lo que necesites con el objeto completo de la opción seleccionada
  }

  onSprintSelected(item) {
    console.log(item);
    const id = this.sprintList.find(option => option.nombre === item);
    console.log('ID: ',id);
    this.tarea.key_sprint = id.id_sprint;
    // Aquí puedes hacer lo que necesites con el objeto completo de la opción seleccionada
  }

  onAreaSelected(item){
    const id = this.areasList.find(option => option.nombre === item);
    this.tarea.key_area = id.id_area;
  }

  onChangeProyect($event) {
    console.log('el valor: ',$event);
    //this.filtredProyects$ = this.getFilteredOptionsProyect(this.autoProyect.nativeElement.value);
  }

  onSelectionChangeProyect($event) {
   //console.log("Si se guardo")
    //this.filtredProyects$ = this.getFilteredOptionsProyect($event);
    this.tarea.key_proyecto = ($event);
    console.log(this.tarea.key_proyecto);
  }


  onChangeSprint($event) {
    //console.log('el valor: ',$event);
    if($event.data === null){
      console.log('Vacio');
      this.tarea.key_sprint = undefined;
    }
    //this.filtredSprints = this.getFilteredOptionsSprint(this.autoSprint.nativeElement.value);
  }

  onSelectionChangeSprint($event) {
    console.log($event)
    //this.filtredSprints = this.getFilteredOptionsSprint($event);
  }

  onChangeArea($event) {
    //console.log('el valor: ',$event);
    if($event.data === null){
      console.log('Vacio');
      this.tarea.key_area = undefined;
    }
    //this.filtredSprints = this.getFilteredOptionsSprint(this.autoSprint.nativeElement.value);
  }

  onSelectionChangeArea($event) {
    console.log($event)
    //this.filtredSprints = this.getFilteredOptionsSprint($event);
  }





  registrarTarea() {
    if(this.form.get('sprint').value !== ''){
      console.log('Vacios');
    }
    this.tarea.key_colaborador = this.idSelectedColabs;
    this._userService
      .registrarTarea(
        this.tarea.nombre,
        this.tarea.descripcion,
        this.tarea.key_epica,
        this.tarea.key_sprint,
        this.tarea.key_proyecto,
        this.tarea.key_colaborador,
        this.tarea.key_area,
      )
      .subscribe(
        (response) => {
          if (response.status != "error") {
            this.ngOnInit();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Guardado con éxito',
              showConfirmButton: false,
              timer: 1200
            });
            this.clearData();
            this.form.reset();
            this.colabsText = "";
          }
        },
        (error) => {
          Swal.fire("UPS", "La tarea no se ha podido registrar.", "error");
        }
      );
  }

  updateTarea() {
    this._userService
      .updateTarea(
        this.tareaCopy.id_tarea,
        this.tareaCopy.nombre,
        this.tareaCopy.descripcion,
        this.tareaCopy.key_epica,
        this.tareaCopy.key_sprint,
        this.tareaCopy.key_proyecto,
        this.tareaCopy.key_colaborador
      )
      .subscribe(
        (response) => {
          if (response.status != "error") {
            this.ngOnInit();
            this.alertUpdate = true;
            this.clearData();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Guardado con éxito',
              showConfirmButton: false,
              timer: 1200
            })
          }
        },
        (error) => {
          Swal.fire("UPS", "La tarea no se ha podido registrar.", "error");
          this.status = "error";
        }
      );
  }

  buscarTareas() {
    this._userService.findTarea(this.text, this.page).subscribe((response) => {
      this.myList2 = response;
      this.modalTable = true;
      console.log(response);
    });
  }

  closeAlert() {
    this.alertUpdate = false;
    this.alert = false;
  }

  clearData() {
    this.tarea = new Tarea("", "", "", "", "", "", "", "");
    this.tareaCopy = new Tarea("", "", "", "", "", "", "", "");
  }

  openModalUpdate(dialog: TemplateRef<any>, item) {
    this.modalUpdate = this.dialogService.open(dialog, {
      context: "this is some",
    });
    this.update = item;
    console.log(item);
  }

  closeModalUpdate() {
    this.modalUpdate.close();
  }

  openModalColaborador(dialog: TemplateRef<any>) {
    this.modalColab = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  closeModalColaborador() {
    this.modalColab.close();
  }

  openModalProyectos(dialog: TemplateRef<any>) {
    this.modalProyect = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  closeModalProyectos() {
    this.modalProyect.close();
  }

  openModalEpica(dialog: TemplateRef<any>) {
    this.modalEpica = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  closeModalEpicas() {
    this.modalEpica.close();
  }

  openModalDescription(dialog: TemplateRef<any>) {
    this.modalDescription = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  closeModalDescription() {
    this.modalDescription.close();
  }

  openModalSprints(dialog: TemplateRef<any>) {
    this.modalSprint = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  closeModalSprints() {
    this.modalSprint.close();
  }

  selectedColabs(id) {
    const numerosArray = this.idSelectedColabs.split(",");
    //console.log(numerosArray.length);
    if (numerosArray.length === 1) {
      this.countColabs = this.countColabs + 1;
      console.log("igual a ", this.countColabs);
    } else {
      this.countColabs = numerosArray.length;
      this.countColabs = this.countColabs + 1;
      console.log("igual a ", this.countColabs);
    }

    if (this.countColabs === 1) {
      this.colabsText = "1 Integrante";
    } else {
      this.colabsText = this.countColabs + " Integrantes";
    }
    //console.log("contador: ",this.countColabs);
    if (this.idSelectedColabs === "") {
      this.idSelectedColabs = id.toString(); // Convierte el número a cadena antes de asignarlo
      this.team(this.idSelectedColabs);
    } else {
      this.idSelectedColabs = this.idSelectedColabs + "," + id;
      let colabs: string[] = this.idSelectedColabs.split(",");
      this.team(this.idSelectedColabs);
      //console.log(colabs);
    }
    //this.equipo.key_colab = this.idSelectedColabs;
    const index = this.colaboradorList.findIndex(
      (colaboradorList) => colaboradorList.id_colab === id
    );

    if (index !== -1) {
      this.colaboradorList.splice(index, 1);
      //console.log('Usuario eliminado:', id);
    }
    //contador de usuarios
    this.countColabs = numerosArray.length;
  }

  team(ids: string) {
    if (ids !== "") {
      this._userService.findColabs(ids).subscribe((response) => {
        this.colabsSelected = response;
      });
    }
  }

  deleteSelectedUsers(id_user) {
    console.log(id_user, typeof id_user);
    this.countColabs = this.countColabs - 1;
    if (this.idSelectedColabs.includes(",")) {
      // console.log("Hay ",this.idSelectedUser, " integrantes.")
      let numeros = this.idSelectedColabs.split(",");

      // Número específico que deseas eliminar
      //let numeroAEliminar = '3'; // Por ejemplo, eliminar el número 3
      //convierte en cadena
      let idCadena = id_user.toString();
      //console.log(typeof(id_user), id_user);
      // Encontrar el índice del número específico en el array
      let indice = numeros.indexOf(idCadena);

      // Si se encuentra el número, eliminarlo del array
      if (indice !== -1) {
        numeros.splice(indice, 1);
      }

      // Volver a unir los números en una cadena, separados por comas
      this.idSelectedColabs = numeros.join(",");
      this.excludeColabs(this.idSelectedColabs);
      this.team(this.idSelectedColabs);
      const numerosArray = this.idSelectedColabs.split(",");
      this.countColabs = numerosArray.length;
      //console.log("despues de borrar hay:", numerosArray.length);
      if (numerosArray.length === 1) {
        this.colabsText = "1 Integrante";
      } else {
        this.colabsText = this.countColabs + " Integrantes";
      }
    } else {
      //console.log("Hay solo uno");
      this.idSelectedColabs = "";
      this.colabsText = "";
      this.colabsSelected = [];

      this._userService.colabsProyect(this.pageModal, this.tarea.key_proyecto).subscribe((response) => {
        this.colaboradorList = response;
      });
    }
  }

  excludeColabs(ids) {
    this._userService.excludeColabsFix(ids, this.pageModal, this.tarea.key_proyecto).subscribe((response) => {
      this.colaboradorList = response;
    });
  }

  selectedProyect(item) {
    this.idSelectedProyect = item.id_proyecto;
    this.tarea.key_proyecto = this.idSelectedProyect;
    this.nameProyect = item.nombre;
    this.closeModalProyectos();
  }

  selectedSprint(item) {
    this.idSelectedProyect = item.id_sprint;
    this.tarea.key_sprint = item.id_sprint;
    this.nameSprint = item.nombre;
    this.closeModalSprints();
  }

  selectedEpica(item) {
    this.idSelectedProyect = item.id_epica;
    this.tarea.key_epica = item.id_epica;
    this.nameEpica = item.nombre;
    this.closeModalEpicas();
  }

  next(){
    this.page ++;
    if(this.modalTable === false){
    this._userService.getPaginationTareas(this.page).subscribe((response) => {
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
    });
  }
  }

  preview(){
    if(this.page > 1){
      this.page --;
      if(this.modalTable === false){
      this._userService.getPaginationTareas(this.page).subscribe((response) => {
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
      });
    }
  }
  }

  searchColab(){
    this.pageModal = 1;
      this._userService.findExcludeProyectColaborador(this.textModal, this.pageModal, this.idSelectedColabs, this.tarea.key_proyecto).subscribe((response) => {
          this.colaboradorList = response;
      });
    }

    nextModal(){
      this.pageModal ++;
      if( this.colabsSelected.length === 0 ){
        this._userService.colabsProyect(this.pageModal, this.tarea.key_proyecto).subscribe((response) => {
            if(response.length !== 0){
              this.colaboradorList = response;
            }else{
              this.pageModal --;
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
        this.excludeColabs(this.idSelectedColabs);
      }
  
    }

    previewModal(){
      if(this.pageModal > 1){
        this.pageModal --;
        if( this.colabsSelected.length === 0 ){
        this._userService.colabsProyect(this.pageModal, this.tarea.key_proyecto).subscribe((response) => {
          if(response.length !== 0){
            this.colaboradorList = response;
          }
        });
      }else{
        this.excludeColabs(this.idSelectedColabs);
      }
      }
    }

}

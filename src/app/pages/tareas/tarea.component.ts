import { Component, TemplateRef, ViewChild, ElementRef  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Tarea } from '../../models/tarea';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
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
  @ViewChild('EpicasAuto') autosEpica: ElementRef;

  filteredEpicas: Observable<any[]>;

  options: any[] = []; // Inicializa options como un array de strings vacío
  filteredOptions$: Observable<string[]>;
  
  optionsProyects: string[] = [];
  filtredProyects$: Observable<string[]>;

  optionsSprints: string[] = [];
  filtredSprints$: Observable<string[]>;

  epicaPrueba = [
    { id: 1, nombre: 'Editor No Funcional' },
    { id: 2, nombre: 'Don Toños' },
    // ...otros objetos
  ];

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
  colabsSelected: any;
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
  constructor(
    private _userService: UserService,
    private _router: Router,
    private http: HttpClient,
    private dialogService: NbDialogService,
    private fb: FormBuilder,

  ) {
    this.tarea = new Tarea("", "", "", "", "", "", "");
    //this.tareaCopy = new Tarea('','','','','','','');
    
    this.form = this.fb.group({
      epica: [''] // FormControl para el input del usuario
    });

  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.epicaList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }



  ngOnInit() {
        this._userService.getTareas().subscribe((response) => {
      this.myList = response;
    });

    this._userService.getEpicas().subscribe((response) => {
      this.epicaList = response;
      this.filteredEpicas = this.form.get('epica').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

    this._userService.getSprints().subscribe((response) => {
      this.sprintList = response;
      this.optionsSprints = this.sprintList.map(sprint => sprint.nombre);
    });

    this._userService.getProyectos().subscribe((response) => {
      this.proyectoList = response;
      this.optionsProyects = this.proyectoList.map(proyecto => proyecto.nombre);
      console.log(response)
      });

    this._userService.getColaboradores().subscribe((response) => {
      this.colaboradorList = response;
    });
    this.filteredOptions$ = this.epicaList;
    this.filtredProyects$ = of(this.optionsProyects);
    this.filtredProyects$ = of(this.optionsSprints);
  }

  private filter(value: string, options: any[]): string[] {
    const filterValue = value.toLowerCase();
    return options
      .filter(option => option.nombre.toLowerCase().includes(filterValue))
      .map(option => option.nombre);
  }
  
  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString, this.epicaList)),
    );
  }
  
  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.autoEpica.nativeElement.value);
  }
  
  onSelectionChange($event) {
    const selectedName = $event;
    const selectedOption = this.epicaList.find(option => option.nombre === selectedName);
    console.log($event);
    //this.nameEpica = 
    //this.tarea.key_sprint = selectedOption.id_epica;
  }

  onEpicaSelected($event) {
    const selectedOption = $event;
    console.log($event);
    // Aquí puedes hacer lo que necesites con el objeto completo de la opción seleccionada
  }


  private filterProyect(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsProyects.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptionsProyect(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterProyect(filterString)),
    );
  }

  onChangeProyect() {
    this.filtredProyects$ = this.getFilteredOptionsProyect(this.autoProyect.nativeElement.value);
  }

  onSelectionChangeProyect($event) {
   //console.log("Si se guardo")
    this.filtredProyects$ = this.getFilteredOptionsProyect($event);
    this.tarea.key_proyecto = ($event);
    console.log(this.tarea.key_proyecto);
  }

  private filterSprint(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsSprints.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptionsSprint(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterSprint(filterString)),
    );
  }

  onChangeSprint() {
    this.filtredSprints$ = this.getFilteredOptionsSprint(this.autoSprint.nativeElement.value);
  }

  onSelectionChangeSprint($event) {
   //console.log("Si se guardo")
    this.filtredSprints$ = this.getFilteredOptionsSprint($event);
    //this.tarea.key_proyecto = ($event);
    //console.log(this.tarea.key_proyecto);
  }

  registrarTarea() {
    this.tarea.key_colaborador = this.idSelectedColabs;
    this._userService
      .registrarTarea(
        this.tarea.nombre,
        this.tarea.descripcion,
        this.tarea.key_epica,
        this.tarea.key_sprint,
        this.tarea.key_proyecto,
        this.tarea.key_colaborador
      )
      .subscribe(
        (response) => {
          if (response.status != "error") {
            this.ngOnInit();
            //this.alert = true;
            this.clearData();
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
            //this.closeModal();
          }
        },
        (error) => {
          Swal.fire("UPS", "La tarea no se ha podido registrar.", "error");
          this.status = "error";
        }
      );
  }

  buscarTareas() {
    this._userService.findTarea(this.text).subscribe((response) => {
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
    this.tarea = new Tarea("", "", "", "", "", "", "");
    this.tareaCopy = new Tarea("", "", "", "", "", "", "");
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
      this.excluseColabs(this.idSelectedColabs);
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

      this._userService.getColaboradores().subscribe((response) => {
        this.colaboradorList = response;
        //console.log(response);
      });
    }
  }

  excluseColabs(ids) {
    this._userService.excludeColabs(ids).subscribe((response) => {
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
}

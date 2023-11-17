import { Component, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Sprint } from '../../models/sprint';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { map, startWith, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'ngx-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent {
  @ViewChild('ProyecSprinttAuto') autoProyectSprint: ElementRef;
  filtredProyects: Observable<string[]>;

  page = 1;
  myList: any;
  myList2: any;
  modalTable = false;
  form: FormGroup;
  proyectoList: any;
  sprint: Sprint;
  proyecto: any;
  countSprints = 0;
  modalDescription: any;
  modalUpdate: any;
  textSprints = "#";
  sprintCopy: any;
  text

  constructor(
    private _userService: UserService,
    private _router: Router,
    private http: HttpClient,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
  ) { 
    this.sprint = new Sprint("", "", "", "");

    this.form = this.fb.group({
      proyecto: ['']
      // FormControl para el input del usuario
    });
  }

  ngOnInit(){
    this._userService.getSprints(this.page).subscribe((response) => {
      this.myList = response;
      console.log(this.myList);
    });

    this._userService.getProyectosSprint().subscribe((response) => {
      this.proyectoList = response;
      this.filtredProyects = this.form.get('proyecto').valueChanges.pipe(
        startWith(''),
        map(value => this._filterP(value))
      );
    });

  }

  private _filterP(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.proyectoList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  onProyectSelected(item) {
    console.log(item);
    const id = this.proyectoList.find(option => option.nombre === item);
    console.log('ID: ',id);
    this.sprint.key_proyecto = id.id_proyecto;
    this.getCountsSprints();
  }

  onChangeProyect($event) {
    console.log('el valor: ',$event);
    //this.filtredProyects$ = this.getFilteredOptionsProyect(this.autoProyect.nativeElement.value);
  }

  registerSprint(){
    this._userService.registerSprint(this.sprint.nombre, this.sprint.descripcion, this.sprint.key_proyecto).subscribe((response) => {
      if (response.status != "error") {
        this.ngOnInit();
        this.form.reset();
        this.clearData();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        });
      }
    },
    (error) => {
      Swal.fire("UPS", "La sprint no se ha podido registrar.", "error");
    }
  );
  }

  openModalUpdate(item, dialog: TemplateRef<any>){
    this.sprintCopy = {...item};
    this.modalUpdateDialog(dialog);
  }

  updateSprint(){
    this._userService.updateSprint(this.sprintCopy.id_sprint, this.sprintCopy.sprint, this.sprintCopy.descripcion).subscribe((response) => {
      if (response.status != "error") {
        this.ngOnInit();
        this.closeModalUpdateDialog();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        });

        this._userService.searchSprints(this.page, this.text).subscribe((response) => {
          this.myList2 = response;
        });
      }
    },
    (error) => {
      Swal.fire("UPS", "La sprint no se ha podido editar.", "error");
    }
    );
  }

  buscarSprint(){
    this._userService.searchSprints(this.page, this.text).subscribe((response) => {
      this.myList2 = response;
      this.modalTable = true;
    });
  }

  clearData(){
    this.sprint = new Sprint("", "", "", "");
    this.textSprints = "Seleccione un proyecto";
  }

  getCountsSprints(){
    this._userService.getCountsSprint(this.sprint.key_proyecto).subscribe((response) => {
      this.countSprints = response;
      this.countSprints = this.countSprints + 1;
      this.textSprints = "Sprint número #" + this.countSprints;
    });
  }

  openModalDescription(dialog: TemplateRef<any>) {
    this.modalDescription = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  modalUpdateDialog(dialog: TemplateRef<any>){
    this.modalUpdate = this.dialogService.open(dialog);
  }

  closeModalUpdateDialog(){
    this.modalUpdate.close();
  }

  next(){
    this.page ++;
    if(this.modalTable === false){
    this._userService.getSprints(this.page).subscribe((response) => {
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
    this._userService.searchSprints(this.page, this.text).subscribe((response) => {
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
      this._userService.getSprints(this.page).subscribe((response) => {
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
      this._userService.searchSprints(this.page, this.text).subscribe((response) => {
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

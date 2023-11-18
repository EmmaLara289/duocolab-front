import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { CheckUser } from '../../services/checkUser';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ["./ticket.component.scss"],
})
export class TicketComponent implements OnInit {
  private ref: NbDialogRef<any>;

  @ViewChild('ProyectAuto') autoProyect: ElementRef;
  @ViewChild('PrioridadAuto') autoPrioridad: ElementRef;

  filtredProyects: Observable<string[]>;
  filtredPrioridades: Observable<string[]>;

	ticket: Ticket;
  alert = false;
	public identity;
	public status: string;
  form: FormGroup;
  proyectoList: any;
  prioridadList: any;
  modalDescription: any;
  myList: any;
  modalUpdate: any;
  id_ticket: any;
  message:  any;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  private CheckUser: CheckUser
  ) {
  this.ticket= new Ticket('','','','','');

  this.form = this.fb.group({
    proyecto: [''],
    prioridades: ['']
  });
  }

  ngOnInit(){
    this.CheckUser.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.CheckUser.userData);
    this.ticket.key_usuario = this.CheckUser.userData.id;

    this._userService.getProyectosByUser(this.CheckUser.userData.id).subscribe((response) => {
      this.proyectoList = response;
      this.filtredProyects = this.form.get('proyecto').valueChanges.pipe(
        startWith(''),
        map(value => this._filterP(value))
      );
      //console.log("Proyectos: ",response);
    });

    this._userService.getPrioridadesStatus().subscribe((response) => {
      this.prioridadList = response;
      this.filtredPrioridades = this.form.get('prioridades').valueChanges.pipe(
        startWith(''),
        map(value => this._filterPD(value))
    );
    });

    this._userService.getTicketInProcess(this.CheckUser.userData.id).subscribe((response) => {
      this.myList = response;
      console.log(response);
      }
    );
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
    const id = this.proyectoList.find(option => option.nombre === item);
    console.log('ID: ',id);
    this.ticket.key_proyecto = id.id_proyecto;
    // Aquí puedes hacer lo que necesites con el objeto completo de la opción seleccionada
  }

  private _filterPD(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.prioridadList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  onChangePrioridad($event) {
    console.log('el valor: ',$event);
    //this.filtredProyects$ = this.getFilteredOptionsProyect(this.autoProyect.nativeElement.value);
  }
  
  onPrioridadSelected(item) {
    console.log(item);
    const id = this.prioridadList.find(option => option.nombre === item);
    console.log('ID: ',id);
    this.ticket.key_prioridad = id.id_prioridad_status;
    // Aquí puedes hacer lo que necesites con el objeto completo de la opción seleccionada
  }

  registrarTicket() {
    let message: string;  // Declarar la variable fuera del observable
  
    this._userService.registrarTicket(this.CheckUser.userData.id, this.ticket.key_proyecto, this.ticket.key_usuario, this.ticket.titulo, this.ticket.detalles, this.ticket.key_prioridad)
      .subscribe(
        (response) => {
          console.log(response);  // Imprimir la respuesta en la consola
          message = response.status;
          this.ngOnInit();
          this.ticket = new Ticket('', '', '', '', '');
          this.form.reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Guardado con éxito',
            showConfirmButton: false,
            timer: 1200
          });
        },
        (error) => {
          console.error(error);  // Imprimir el error en la consola
          if (error.error.message === "Libere primero el ticket") {
            Swal.fire('Hay un ticket por liberar aún.', 'Libere el ticket antes de crear uno nuevo', 'error');
          }else{
            Swal.fire('UPS', 'El ticket no se ha podido registrar.', 'error');
          }
        }
      );
  }
  

  openModalDescription(dialog: TemplateRef<any>) {
    this.modalDescription = this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  openModalUpdateDialog(item, dialog: TemplateRef<any>){
    this.modalUpdate = this.dialogService.open(dialog);
    this.id_ticket = item.id_ticket;
  }

  closeModalUpdateDialog(){
    this.modalUpdate.close();
  }

  freeTicket(){
    this._userService.freeTicket(this.id_ticket).subscribe(response => {
      if(response.status != 'error'){
        this.ngOnInit();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1200
        });
        this.closeModalUpdateDialog();
        this.ticket= new Ticket('','','','','');
        this.form.reset();
        }
        
      },
      error => {
        Swal.fire('UPS', 'El ticket no se ha podido registrar.', 'error');
      	}
   	);
  }

}

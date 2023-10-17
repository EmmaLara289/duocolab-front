import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnInit {
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
  constructor(
  private _userService: UserService,
  private _router: Router,
  private fb: FormBuilder,
  ) {
  this.ticket= new Ticket('','','','','');

  this.form = this.fb.group({
    proyecto: [''],
    prioridades: ['']
  });
  }

  ngOnInit(){
    this._userService.getProyectos().subscribe((response) => {
      this.proyectoList = response;
      this.filtredProyects = this.form.get('proyecto').valueChanges.pipe(
        startWith(''),
        map(value => this._filterP(value))
      );
      //console.log("Proyectos: ",response);
    });

    this._userService.getPrioridades().subscribe((response) => {
      this.prioridadList = response;
      this.filtredPrioridades = this.form.get('prioridades').valueChanges.pipe(
        startWith(''),
        map(value => this._filterPD(value))
    );

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
    this.ticket.key_prioridad = id.id_prioridad;
    // Aquí puedes hacer lo que necesites con el objeto completo de la opción seleccionada
  }

  registrarTicket(){
  this._userService.registrarTicket(this.ticket.key_proyecto, this.ticket.key_usuario, this.ticket.titulo, this.ticket.detalles, this.ticket.key_prioridad).subscribe(
      response => {
      if(response.status != 'error'){
        this.ngOnInit();
        this.alert = true;
        this.ticket= new Ticket('','','','','');
        }
        
      },
      error => {
        Swal.fire('UPS', 'El ticket no se ha podido registrar.', 'error');
      	}
   	);
	}

}

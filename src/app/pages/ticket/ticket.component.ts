import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnInit {
	ticket: Ticket;
  alert = false;
	public identity;
	public status: string;
  constructor(
  private _userService: UserService,
  private _router: Router
  ) {
  this.ticket= new Ticket('','','','','')
  }

  ngOnInit(): void {
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

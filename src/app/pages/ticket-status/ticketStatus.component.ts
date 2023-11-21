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
  templateUrl: './ticketStatus.component.html',
  styleUrls: ["./ticketStatus.component.scss"],
})
export class TicketStatusComponent implements OnInit {
  private ref: NbDialogRef<any>;
  myList: any;
  myList2: any;
  page = 1;
  text = "";
  pageSearch = 1;
  modalTable = false;
  modalDialogHistory: any;
  estatus_ticket: any;
  constructor(
  private _userService: UserService,
  private _router: Router,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  private CheckUser: CheckUser
  ) {

  }

  ngOnInit(){
  this._userService.getTickets(this.page).subscribe((response) => {
    this.myList = response;
    });
  }

  buscarTicket(){
    if(this.text !== ""){
      this._userService.findTicket(this.text, this.pageSearch).subscribe((response) => {
        this.myList2 = response;
        this.modalTable = true;
      });
    }else{
      this.page = 1;
      this._userService.getTickets(this.page).subscribe((response) => {
        this.myList = response;
        this.modalTable = false;
        });
    }
  }

  openModalHistoryTicket(item, dialog: TemplateRef<any>){

    this._userService.getHistoryTicket(item).subscribe((response) => {
      this.estatus_ticket = response;
    });

    this.modalDialogHistory = this.dialogService.open(dialog);
    
  }

  closeModalHistoryTicket(){
    this.modalDialogHistory.close();
  }
   
  next(){
    this.page ++;
    this._userService.getTickets(this.page).subscribe((response) => {
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
  }

  preview(){
    if(this.page > 1){
      this.page --;
      this._userService.getTickets(this.page).subscribe((response) => {
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
    }
  }

  nextSearch(){
    this.pageSearch ++;
    this._userService.findTicket(this.text, this.pageSearch).subscribe((response) => {
      if(response.length !== 0){
        this.myList = response;
      }else{
        this.pageSearch--;
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

  previewSearch(){
    if(this.pageSearch > 1){
      this.pageSearch --;
      this._userService.findTicket(this.text, this.pageSearch).subscribe((response) => {
        if(response.length !== 0){
          this.myList = response;
        }else{
          this.pageSearch--;
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

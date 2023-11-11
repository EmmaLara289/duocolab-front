import { Component, OnInit } from '@angular/core';
import { Lista } from '../../models/lista';
import { UserService } from '../../services/user.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ngx-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {
  lists: Lista[];
  tareasBuzon: any;
  tareasProgreso: any;
  tareasProbando: any;
  tareasRealizadas: any;
  List = ["Buzon", "Progreso", "Realizadas"];

  constructor(
    private _userService: UserService
  ) {
    this.lists = [];
   }

  ngOnInit(){
    this._userService.getTareasBuzon().subscribe((response) => {
      this.tareasBuzon =  response;
    });

    this._userService.getTareasProgreso().subscribe((response) => {
      this.tareasProgreso =  response;
    });

    this._userService.getTareasProbando().subscribe((response) => {
      this.tareasProbando =  response;
    });

    this._userService.getTareasRealizadas().subscribe((response) => {
      this.tareasRealizadas =  response;
    });
  }
  
  move(event: CdkDragDrop<any[]>, listaDestino: string) {
    const tareaMovida = event.item.data;

    console.log(event.item);
    console.log(listaDestino);
  
    if (event.previousContainer === event.container) {
      // Mover dentro de la misma lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transferir de una lista a otra
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
  
      // Identificar el cambio de lista
      console.log(`Tarea ${tareaMovida.id_tarea} movida de ${event.previousContainer.id} a ${event.container.id}`);
    }
  }

}

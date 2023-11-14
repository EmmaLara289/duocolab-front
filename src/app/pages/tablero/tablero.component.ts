import { Component, OnInit } from '@angular/core';
import { Lista } from '../../models/lista';
import { UserService } from '../../services/user.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CheckUser } from '../../services/checkUser';

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
    private _userService: UserService,
    private CheckUser: CheckUser,
  ) {
    this.lists = [];
   }

  ngOnInit(){
    this.CheckUser.userData = JSON.parse(localStorage.getItem('userData'));
    this._userService.getTareasBuzon(this.CheckUser.userData.id).subscribe((response) => {
      this.tareasBuzon =  response;
    });

    this._userService.getTareasProgreso(this.CheckUser.userData.id).subscribe((response) => {
      this.tareasProgreso =  response;
    });

    this._userService.getTareasProbando(this.CheckUser.userData.id).subscribe((response) => {
      this.tareasProbando =  response;
    });

    this._userService.getTareasRealizadas(this.CheckUser.userData.id).subscribe((response) => {
      this.tareasRealizadas =  response;
    });
  }
  
  move(event: CdkDragDrop<any>, listaDestino: string) {
    const tarea = event.item.data;
    //const list = listaDestino;

    //console.log("ID_TAREA: ", tarea);
    //console.log(event.currentIndex);
    //console.log(listaDestino);
    //this.changeStatus()
  
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

      this.changeStatus(tarea.id_tarea, Number(listaDestino));
  
      // Identificar el cambio de lista
      //console.log(`Tarea ${tareaMovida.id_tarea} movida de ${event.previousContainer.id} a ${event.container.id}`);
    }
  }

  changeStatus(id_tarea:number, key_tarea_status: number){
    this._userService.changeStatusTarea(id_tarea, key_tarea_status).subscribe((response) => {
      console.log("KIUbo");
    });
  }

}

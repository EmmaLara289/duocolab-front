import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  private identity;
  private token;
  public onSuccessLogin = new EventEmitter();
  constructor(public _http: HttpClient) {
    this.url = global.url;
  }



  public login(email: string, password: string): Observable<any> {
    return this._http.post(global.url + 'login',
     { email: email, password: password });
  }

  public register(name:string, email:string, password:string): Observable<any>{
    return this._http.post(global.url + 'register',
    { name:name, email:email, password: password});
  }

  public getUsers(): Observable<any>{
    return this._http.get(global.url + 'getUsers');
  }


  public registrarEquipo(nombre: string, key_proyecto:string, key_colab:string): Observable<any> {
    return this._http.post(global.url + 'createEquipo',
     {nombre: nombre, key_proyecto: key_proyecto, key_colab:key_colab});
  }

  public registrarProyecto(nombre: string, key_equipo: string, imagen: string, detalles:string): Observable<any>{
    return this._http.post(global.url + 'createProyecto',
    {nombre:nombre, key_equipo:key_equipo, imagen:imagen, detalles:detalles});
  }

  public registrarColaborador(nombre:string, telefono:string, foto:string, github:string, correo:string): Observable<any>{
    return this._http.post(global.url + 'createColaborador',
    {nombre:nombre, telefono:telefono, foto:foto, github:github, correo:correo});
  }

  public registrarEpica(nombre:string, proyecto: string, descripcion:string): Observable<any>{
    return this._http.post(global.url + 'createEpica',
    {nombre:nombre, proyecto:proyecto, descripcion:descripcion});
  }

  public registrarTarea(nombre:string, descripcion:string, key_epica:string, key_sprint:string, key_proyecto:string, key_colaborador:string): Observable<any>{
    return this._http.post(global.url + 'createTarea',
    {nombre:nombre, descripcion:descripcion, key_epica:key_epica, key_sprint:key_sprint, key_proyecto:key_proyecto, key_colaborador:key_colaborador});
  }

  public registrarEstatusTarea(nombre:string): Observable<any>{
    return this._http.post(global.url + 'createEstatusTarea',
    {nombre:nombre});
  }

  public registrarSprint(nombre:string, descripcion:string, key_proyecto:string): Observable<any>{
    return this._http.post(global.url + 'createSprint',
    {nombre:nombre, descripcion:descripcion, key_proyecto:key_proyecto});
  }

  public registrarArea(nombre:string): Observable<any>{
    return this._http.post(global.url + 'createArea',
    {nombre:nombre});
  }

  public registrarTicket(key_proyecto:string, key_usuario:string, titulo:string, detalles:string, key_prioridad:string): Observable <any>{
    return this._http.post(global.url + 'createTicket',
    {key_proyecto:key_proyecto, key_usuario:key_usuario, titulo:titulo, detalles:detalles, key_prioridad:key_prioridad});
  }

  public registrarPrioridad(nombre:string): Observable<any>{
    return this._http.post(global.url + 'createPrioridad',
    {nombre:nombre});
  }

  public getProyectos(): Observable<any>{
    return this._http.get(global.url + 'getProyectos');
  }

  public getEquipos(): Observable<any>{
    return this._http.get(global.url + 'getEquipos');
  }

  public getColaboradores(): Observable<any>{
    return this._http.get(global.url + 'getColaboradores');
  }

  public getAreas(): Observable<any>{
    return this._http.get(global.url + 'getAreas');
  }

  public getEstatusTareas(): Observable<any>{
    return this._http.get(global.url + 'getEstatusTareas');
  }

  public getPrioridades(): Observable<any>{
    return this._http.get(global.url + 'getPrioridades');
  }

  public getSprints(): Observable<any>{
    return this._http.get(global.url + 'getSprints');
  }

  public getEpicas(): Observable<any>{
    return this._http.get(global.url + 'getEpicas');
  }

  public getTareas(): Observable<any>{
    return this._http.get(global.url + 'getTareas');
  }  

  public updateProyecto(id_proyecto:string, nombre: string, key_equipo: string, imagen: string, detalles:string): Observable<any>{
    return this._http.post(global.url + 'updateProyecto',
    {id_proyecto:id_proyecto, nombre:nombre, key_equipo:key_equipo, imagen:imagen, detalles:detalles});
  }

  public updateEquipo(id_equipo:string, nombre: string, key_proyecto:string, key_colab:string): Observable<any> {
    return this._http.post(global.url + 'updateEquipo',
     {id_equipo:id_equipo, nombre: nombre, key_proyecto: key_proyecto, key_colab:key_colab});
  }

  public updateColaborador(id_colab:string, nombre:string, telefono:string, foto:string, github:string, correo:string): Observable<any>{
    return this._http.post(global.url + 'updateColaborador',
    {id_colab:id_colab, nombre:nombre, telefono:telefono, foto:foto, github:github, correo:correo});
  }

  public updateArea(id_area:string, nombre:string): Observable<any>{
    return this._http.post(global.url + 'updateArea',
    {id_area:id_area, nombre:nombre});
  } 

  public updateEstatusTarea(id_estatus:string, nombre:string): Observable<any>{
    return this._http.post(global.url + 'updateEstatusTarea',
    {id_estatus:id_estatus, nombre:nombre});
  }

  public updatePrioridad(id_prioridad:string, nombre:string): Observable<any>{
    return this._http.post(global.url + 'updatePrioridad',
    {id_prioridad:id_prioridad, nombre:nombre});
  }

  public updateSprint(id_sprint:string, nombre:string, descripcion:string, key_proyecto:string): Observable<any>{
    return this._http.post(global.url + 'updateSprint',
    {id_sprint:id_sprint, nombre:nombre, descripcion:descripcion, key_proyecto:key_proyecto});
  }

  public updateEpica(id_epica:string, nombre:string, proyecto: string, descripcion:string): Observable<any>{
    return this._http.post(global.url + 'updateEpica',
    {id_epica:id_epica, nombre:nombre, proyecto:proyecto, descripcion:descripcion});
  }

  public updateTarea(id_tarea:string, nombre:string, descripcion:string, key_epica:string, key_sprint:string, key_proyecto:string, key_colaborador:string): Observable<any>{
    return this._http.post(global.url + 'updateTarea',
    {id_tarea:id_tarea, nombre:nombre, descripcion:descripcion, key_epica:key_epica, key_sprint:key_sprint, key_proyecto:key_proyecto, key_colaborador:key_colaborador});
  }



}
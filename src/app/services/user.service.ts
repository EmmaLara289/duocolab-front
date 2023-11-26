import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  private identity;
  private token = (localStorage.getItem('token'));
  public onSuccessLogin = new EventEmitter();
  constructor(public _http: HttpClient) {
    this.url = global.url;
  }



  public login(email: string, password: string): Observable<any>{
    return this._http.post(global.url + 'login',
     { email: email, password: password });
  }

  public register(name:string, email:string, password:string, key_role:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'register',
    { name:name, email:email, password: password, key_role: key_role}, {headers});
  }

  public getUsers(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getUsers', {headers});
  }

  public getTareaStatus(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getTareaStatus', {headers});
  }

  public getUserMenu2(id: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_user', id)
    return this._http.get(global.url + 'getAccesModules', {headers, params});
  }

  public getUserMenu(id: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_user', id)
    return this._http.get(global.url + 'getUserMenu', {headers, params});
  }

  public getUserMenuGreed(id: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_user', id)
    return this._http.get(global.url + 'getUserMenuGreed', {headers, params});
  }

  public getTickets(page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getTickets', {headers, params});
  }

  public updateAccess(id_user: number, module_options: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'updateAccesModules',
    { id_user: id_user, module_options: module_options },
    {headers}
    );
  }

  public findUsers(ids: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('ids', ids);
    return this._http.get(this.url + 'findUsers', {headers, params});
  }

  public findUsersName(text: string, page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('text', text);
    params = params.set('page', page);
    return this._http.get(this.url + 'searchUsers', {headers, params});
  }

  public findColabs(ids: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('ids', ids);
    return this._http.get(this.url + 'findColabs', {headers, params});
  }

  public findProyect(ids: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('ids', ids);
    return this._http.get(this.url + 'findProyectos', {headers, params});
  }

  public excludeUsers(ids: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('ids', ids);
    return this._http.get(this.url + 'excludeUsers', {headers,  params});
  }

  public excludeColabs(ids: string, page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('ids', ids);
    if( page < 1){
      page = 1;
    }
    params = params.set('page', page);
    return this._http.get(this.url + 'excludeColabs', {headers,  params});
  }

  public excludeColabsFix(ids: string, page: number, key_proyecto: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('ids', ids);
    if( page < 1){
      page = 1;
    }
    params = params.set('page', page);
    params = params.set('key_proyecto', key_proyecto);
    return this._http.get(this.url + 'excludeColabsFix', {headers,  params});
  }


  public registrarEquipo(nombre: string, key_colab:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'createEquipo',
     {nombre: nombre, key_colab:key_colab},
     {headers}
     );
  }

  public registrarProyecto(nombre: string, key_equipo: string, imagen: string, detalles:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('key_equipo', key_equipo);
    formData.append('foto', imagen);
    formData.append('detalles', detalles);
    return this._http.post(global.url + 'createProyecto', formData, {headers});
  }

  public findProyecto(text:string, page: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
    params = params.set('text', text);
    }
    if( page !== undefined){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchProyectos', {headers,  params});
  }

  registrarColaborador(nombre: string, telefono: string, foto: File, github: string, correo: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('telefono', telefono);
    formData.append('foto', foto); // Agrega la foto como archivo al FormData
    formData.append('github', github);
    formData.append('correo', correo);

    return this._http.post(global.url + 'createColaborador', formData, {headers});
  }

  public findColaborador(text:string, page: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if(page !== undefined){
      params = params.set('page', page)
    }
  return this._http.get(this.url+ 'searchColaboradores', {headers,  params});
  }

  public findAllColaborador(text:string, page: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if(page !== undefined){
      params = params.set('page', page)
    }
  return this._http.get(this.url+ 'searchAllColaboradores', {headers,  params});
  }

  public findExcludeColaborador(text:string, page: number, ids: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if(page !== undefined){
      params = params.set('page', page)
    }
    if(ids !== undefined){
      params = params.set('ids', ids);
    }
  return this._http.get(this.url+ 'searchExcludeColaboradores', {headers,  params});
  }

  public findExcludeProyectColaborador(text:string, page: number, ids: string, key_proyecto: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if(page !== undefined){
      params = params.set('page', page)
    }
    if(ids !== undefined){
      params = params.set('ids', ids);
    }
    if( key_proyecto !== undefined ){
      params = params.set('key_proyecto', key_proyecto);
    }
  return this._http.get(this.url+ 'searchExcludeProyectColaboradores', {headers,  params});
  }
  
  public registrarEpica(nombre:string, proyecto: string, descripcion:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'createEpica',
    {nombre:nombre, proyecto:proyecto, descripcion:descripcion},
    {headers}
    );
  }

  public findEpica(text:string, page: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if( page !== undefined){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchEpicas', {headers,  params});
  }


  public registrarTarea(nombre:string, descripcion:string, key_epica:string, key_sprint:string, key_proyecto:string, key_colaborador:string, key_area: string, key_prioridad_status:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('key_epica', key_epica);
    formData.append('key_sprint', key_sprint);
    formData.append('key_proyecto', key_proyecto);
    formData.append('key_area', key_area);
    formData.append('key_prioridad_status', key_prioridad_status);
    if(key_colaborador !== ""){
      formData.append('key_colaborador', key_colaborador);
    }else{
      formData.append('key_colaborador', "0");
    }
    return this._http.post(global.url + 'createTarea', formData, {headers});
  }

  public findTarea(text:string, page: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if( page !== undefined ){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchTareas', {headers,  params});
  }

  
  public ableMember(id_equipo:number, key_colab: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'ableMember',
    {id_equipo:id_equipo, key_colab:key_colab},
    {headers}
    );
  }

  public disableMember(id_tarea:number, key_colab: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'disable_Colaborador_Tarea',
    {id_tarea:id_tarea, key_colab:key_colab},
    {headers}
    );
  }

  public disableMemberEquipo(id_equipo:number, key_colab: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'disableMember',
    {id_equipo:id_equipo, key_colab:key_colab},
    {headers}
    );
  }

  public ableMemberEquipo(id_equipo:number, key_colab: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'ableMember',
    {id_equipo:id_equipo, key_colab:key_colab},
    {headers}
    );
  }

  public ableMemberTarea(id_tarea:number, key_colab: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_tarea', id_tarea)
    params = params.set('key_colab', key_colab)
    return this._http.get(global.url + 'able_Colaborador_Tarea', {headers,  params});
  }

  public disableMemberTarea(id_tarea:number, key_colab: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_tarea', id_tarea)
    params = params.set('key_colab', key_colab)
    return this._http.get(global.url + 'disable_Colaborador_Tarea', {headers,  params});
  }

  public tareaStatus(id_tarea: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_tarea', id_tarea);
    return this._http.get(global.url + 'tarea_status', {headers,  params});
  }

  public getEquipoStatus(id_equipo:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'equipoStatus',
    {id_equipo:id_equipo},
    {headers}
    );
  }

  public registrarEstatusTarea(nombre:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'createEstatusTarea',
    {nombre:nombre},
    {headers}
    );
  }

  public registrarSprint(nombre:string, descripcion:string, key_proyecto:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'createSprint',
    {nombre:nombre, descripcion:descripcion, key_proyecto:key_proyecto},
    {headers}
    );
  }

  public registrarArea(nombre:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'createArea',
    {nombre:nombre},
    {headers}
    );
  }

  public registrarTicket(id_user:number, key_proyecto:string, key_usuario:string, titulo:string, detalles:string, key_prioridad:string): Observable <any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'createTicket',
    {id_user:id_user, key_proyecto:key_proyecto, key_usuario:key_usuario, titulo:titulo, detalles:detalles, key_prioridad:key_prioridad},
    {headers},
    );
  }

  public findTicket(text:string, page: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
    params = params.set('text', text);
    }
    if( page !== undefined){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchTickets', {headers,  params});
  }

  public registrarPrioridad(nombre:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'createPrioridad',
    {nombre:nombre},
    {headers}
    );
  }

  public getProyectos(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getProyectos',
    {headers}
    );
  }

  public getProyectosByUser(id_user: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_user', id_user);
    return this._http.get(global.url + 'getProyectosByUser', {headers,  params});
  }

  public getTicketInProcess(id_user: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_user', id_user);
    return this._http.get(global.url + 'getTicketInProcess', {headers,  params});
  }

  public getPaginationProyectos(page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(page !== undefined){
    params = params.set('page', page);
    }
    return this._http.get(global.url + 'getPaginationProyectos', {headers,  params});
  }

  public getPaginationUsers(page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getUsersPaginate', {headers,  params});
  }

  public getPaginationTareaColab(id_colab:number, page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('id_colab', id_colab)
    return this._http.get(global.url + 'getTareasColab', {headers, params});
  }

  public searchPaginationTareaColab(id_colab:number, page: number, text: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('id_colab', id_colab);
    params = params.set('text', text);
    return this._http.get(global.url + 'searchTareasColab', {headers,  params});
  }

  public createHistorial(id_tarea:number, descripcion: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'createStatusTarea',
    {id_tarea:id_tarea, descripcion:descripcion},
    {headers}
    );
  }

  public freeTicket(id_ticket:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'freeTicket',
    {id_ticket:id_ticket},
    {headers}
    );
  }

  public getEquipos(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getEquipos',
    {headers}
    );
  }

  public getExcludeEquipos(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getExcludeEquipos',
    {headers}
    );
  }

  public getPaginationEquipos(page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getPaginationEquipos', {headers,  params});
  }

  public getColaboradores(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getColaboradores', {headers});
  }

  public getPaginationColaboradores(page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getPaginationColaboradores', {headers,  params});
  }

  public getEstatusTareas(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getEstatusTareas', {headers});
  }

  public getPaginationEstatusTareas(page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getPaginationEstatusTareas', {headers,  params});
  }

  public getPrioridades(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getPrioridades', {headers});
  }

  public getPrioridadesStatus(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getPrioridadStatus', {headers});
  }

  public getPaginationPrioridades(page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getPaginationPrioridades', {headers,  params});
  }
  
  public sprintProyect(key_proyecto: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('key_proyecto', key_proyecto);
    return this._http.get(global.url + 'sprintProyect', {headers,  params});
  }

  public epicaProyect(key_proyecto: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('key_proyecto', key_proyecto);
    return this._http.get(global.url + 'epicaProyect', {headers,  params});
  }

  public colabsProyect(page:number, key_proyecto: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('key_proyecto', key_proyecto);
    params = params.set('page', page);
    return this._http.get(global.url + 'colabsProyecto', {headers,  params});
  }

  public finishTarea(id_tarea:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'finishTarea',
    {id_tarea:id_tarea},
    {headers}
    );
  }

  public undoFinishTarea(id_tarea:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'undoFinishTarea',
    {id_tarea:id_tarea},
    {headers}
    );
  }

  public getEpicas(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getEpicas', {headers});
  }

  public getPaginationEpicas(page:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(page !== undefined){
      params = params.set('page', page);
    }
    return this._http.get(global.url + 'getPaginationEpica', {headers,  params});
  }

  public getTareas(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getTareas', {headers});
  }  

  public getTareasBuzon(id:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('key_colaborador', id);
    return this._http.get(global.url + 'getTareasBuzon', {headers,  params});
  }  

  public getTareasProgreso(id:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('key_colaborador', id);
    return this._http.get(global.url + 'getTareasProgreso', {headers,  params});
  }  

  public getTareasProbando(id:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('key_colaborador', id);
    return this._http.get(global.url + 'getTareasProbando', {headers,  params});
  }  

  public getTareasRealizadas(id:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('key_colaborador', id);
    return this._http.get(global.url + 'getTareasRealizadas', {headers,  params});
  }  

  public changeStatusTarea(id_tarea:number, key_tarea_status:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'changeTareaStatus',
    {id_tarea:id_tarea, key_tarea_status:key_tarea_status},
    {headers}
    );
  }

  public getPaginationTareas(page:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(page !== undefined){
      params = params.set('page', page);
    }
    return this._http.get(global.url + 'getPaginationTareas', {headers,  params});
  }

/*
  public updateProyecto(id_proyecto:string, nombre: string, key_equipo: string, imagen: string, detalles:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'updateProyecto',
    {id_proyecto:id_proyecto, nombre:nombre, key_equipo:key_equipo, imagen:imagen, detalles:detalles});
  }
*/

  public updateProyecto(id_proyecto:string, nombre: string, key_equipo: string, imagen: string, detalles:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const formData = new FormData();
    formData.append('id_proyecto', id_proyecto);
    formData.append('nombre', nombre);
    formData.append('key_equipo', key_equipo);
    formData.append('foto', imagen);
    formData.append('detalles', detalles);
    return this._http.post(global.url + 'updateProyecto', formData, {headers});
  }

  public findEquipo(text:string, page:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text !== ''){
      params = params.set('text', text);
    }

    if(page !== undefined){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchEquipos', {headers,  params});
  }

  public updateEquipo(id_equipo:string, nombre: string, key_colab:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'updateEquipo',
     {id_equipo:id_equipo, nombre: nombre, key_colab:key_colab}, 
     {headers}
     );
  }

  public ableColaborador(id_colab:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'able_Colaborador',
     {id_colab:id_colab},
     {headers}
     );
  }

  public disableColaborador(id_colab:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'disable_Colaborador',
     {id_colab:id_colab},
     {headers}
    );
  }

 /* public updateColaborador(id_colab:string, nombre:string, telefono:string, foto:any, github:string, correo:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'updateColaborador',
    {id_colab:id_colab, nombre:nombre, telefono:telefono, foto:foto, github:github, correo:correo});
  }*/

  public updateColaborador(id_colab:string, nombre:string, telefono:string, foto:any, github:string, correo:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const formData = new FormData();
    formData.append('id_colab', id_colab);
    formData.append('nombre', nombre);
    formData.append('telefono', telefono);
    console.log(typeof(foto))
    if(typeof(foto) !== "string"){
      formData.append('foto', foto); // Agrega la foto como archivo al FormData
    }
    formData.append('github', github);
    formData.append('correo', correo);
    return this._http.post(global.url + 'updateColaborador', formData, {headers});
  }

  public updateArea(id_area:string, nombre:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'updateArea',
    {id_area:id_area, nombre:nombre},
    {headers}
    );
  } 

  public getAreas(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getAreas', {headers});
  }

  public getPaginationAreas(page: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(page !== undefined){
    params = params.set('page', page);
    }
    return this._http.get(global.url + 'getPaginationAreas', {headers,  params});
  }

  public findArea(text:string, page:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if( page !== undefined ){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchAreas', {headers,  params});
  }

  public updateEstatusTarea(id_estatus:string, nombre:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'updateEstatusTarea',
    {id_estatus:id_estatus, nombre:nombre},
    {headers}
    );
  }

  public findEstatusTarea(text:string, page:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if( page !== undefined ){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchEstatusTareas', {headers,  params});
  }

  public updatePrioridad(id_prioridad:string, nombre:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'updatePrioridad',
    {id_prioridad:id_prioridad, nombre:nombre},
    {headers}
    );
  }

  public findPrioridad(text:string, page:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if( page !== undefined ){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchPrioridades', {headers,  params});
  }

  public updateSprint(id_sprint:string, nombre:string, descripcion:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'updateSprint',
    {id_sprint:id_sprint, nombre:nombre, descripcion:descripcion},
    {headers}
    );
  }

  public updateEpica(id_epica:string, nombre:string, proyecto: string, descripcion:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'updateEpica',
    {id_epica:id_epica, nombre:nombre, proyecto:proyecto, descripcion:descripcion},
    {headers}
    );
  }

  public updateTarea(id_tarea:string, nombre:string, descripcion:string, key_colaborador:number, key_tarea_status:number, key_prioridad_status: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'updateTarea',
    {id_tarea:id_tarea, nombre:nombre, descripcion:descripcion, key_colaborador:key_colaborador, key_tarea_status:key_tarea_status, key_prioridad_status:key_prioridad_status},
    {headers}
    );
  }

  public getModules():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getModules', {headers});
  }

  public getModuleOptionsByUser(id_user: number, id_module: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_user', id_user);
    params = params.set('id_module', id_module);
    return this._http.get(global.url + 'getAccesModules', {headers,  params});
  }

  public getModuleOptionsByUser22(id_user: number, id_module: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_user', id_user);
    params = params.set('id_module', id_module);
    return this._http.get(global.url + 'getAccesModules', {headers,  params});
  }

  public getExportTareas(key_proyecto: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('key_proyecto', key_proyecto);

    // Indica que esperas una respuesta de tipo texto (para capturar el encabezado)
    return this._http.get(global.url + 'ExportTareasProyecto', {
      headers, params,
      responseType: 'text' // Indica el tipo de respuesta esperada (texto)
    });
  }

  public getReportTareas():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getReportTareasProyecto', {headers});
  }

  public getSprints(page: any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getPaginationSprint', {headers,  params});
  }

  public getProyectosSprint():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.get(global.url + 'getProyectosSprints', {headers});
  }

  public getCountsSprint(key_proyecto: any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('key_proyecto', key_proyecto);
    return this._http.get(global.url + 'getCountsSprints', {headers,  params});
  }

  public searchSprints(page: any, text: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('text', text);
    return this._http.get(global.url + 'searchSprints', {headers,  params});
  }

  public getAccessProyect(id_user: number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_user', id_user);
    return this._http.get(global.url + 'proyectoAccess', {headers,  params});
  }

  public deniedAccessProyect(id_user: string, id_proyecto: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_user', id_user);
    params = params.set('id_proyecto', id_proyecto);
    return this._http.get(global.url + 'deniedAccessProyect', {headers,  params});
  }

  public authAccessProyect(id_user: string, id_proyecto: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('id_user', id_user);
    params = params.set('id_proyecto', id_proyecto);
    return this._http.get(global.url + 'authAccessProyect', {headers,  params});
  }

  public registerSprint(nombre:string, descripcion:string, key_proyecto:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this._http.post(global.url + 'createSprint',
    { nombre:nombre, descripcion:descripcion, key_proyecto: key_proyecto},
    {headers}
    );
  }

  public getHistoryTicket(key_ticket:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams();
    params = params.set('key_ticket', key_ticket);
    return this._http.get(global.url + 'getHistoryTicket', {headers,  params});
  }
  

}
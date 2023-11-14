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
  private token;
  public onSuccessLogin = new EventEmitter();
  constructor(public _http: HttpClient) {
    this.url = global.url;
  }



  public login(email: string, password: string): Observable<any> {
    return this._http.post(global.url + 'login',
     { email: email, password: password });
  }

  public register(name:string, email:string, password:string, key_role:any): Observable<any>{
    return this._http.post(global.url + 'register',
    { name:name, email:email, password: password, key_role: key_role});
  }

  public getUsers(): Observable<any>{
    return this._http.get(global.url + 'getUsers');
  }

  public getTareaStatus(): Observable<any>{
    return this._http.get(global.url + 'getTareaStatus');
  }

  public getUserMenu2(id: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('id_user', id)
    return this._http.get(global.url + 'getAccesModules', {params:params});
  }

  public getUserMenu(id: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('id_user', id)
    return this._http.get(global.url + 'getUserMenu', {params:params});
  }

  public getUserMenuGreed(id: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('id_user', id)
    return this._http.get(global.url + 'getUserMenuGreed', {params:params});
  }

  public getTickets(page: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getTickets', {params: params});
  }

  public updateAccess(id_user: number, module_options: any): Observable<any>{
    return this._http.post(global.url + 'updateAccesModules',
    { id_user: id_user, module_options: module_options });
  }

  public findUsers(ids: string): Observable<any>{
    let params = new HttpParams();
    params = params.set('ids', ids);
    return this._http.get(this.url + 'findUsers', {params: params});
  }

  public findUsersName(text: string, page: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('text', text);
    params = params.set('page', page);
    return this._http.get(this.url + 'searchUsers', {params: params});
  }

  public findColabs(ids: string): Observable<any>{
    let params = new HttpParams();
    params = params.set('ids', ids);
    return this._http.get(this.url + 'findColabs', {params: params});
  }

  public findProyect(ids: string): Observable<any>{
    let params = new HttpParams();
    params = params.set('ids', ids);
    return this._http.get(this.url + 'findProyectos', {params: params});
  }

  public excludeUsers(ids: string): Observable<any>{
    let params = new HttpParams();
    params = params.set('ids', ids);
    return this._http.get(this.url + 'excludeUsers', {params: params});
  }

  public excludeColabs(ids: string, page: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('ids', ids);
    if( page < 1){
      page = 1;
    }
    params = params.set('page', page);
    return this._http.get(this.url + 'excludeColabs', {params: params});
  }

  public excludeColabsFix(ids: string, page: number, key_proyecto: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('ids', ids);
    if( page < 1){
      page = 1;
    }
    params = params.set('page', page);
    params = params.set('key_proyecto', key_proyecto);
    return this._http.get(this.url + 'excludeColabsFix', {params: params});
  }


  public registrarEquipo(nombre: string, key_colab:string): Observable<any> {
    return this._http.post(global.url + 'createEquipo',
     {nombre: nombre, key_colab:key_colab});
  }

  public registrarProyecto(nombre: string, key_equipo: string, imagen: string, detalles:string): Observable<any>{
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('key_equipo', key_equipo);
    formData.append('foto', imagen);
    formData.append('detalles', detalles);
    return this._http.post(global.url + 'createProyecto', formData);
  }

  public findProyecto(text:string, page: number):Observable<any>{
    let params = new HttpParams();
    if(text!==''){
    params = params.set('text', text);
    }
    if( page !== undefined){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchProyectos', {params: params});
  }

  registrarColaborador(nombre: string, telefono: string, foto: File, github: string, correo: string): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('telefono', telefono);
    formData.append('foto', foto); // Agrega la foto como archivo al FormData
    formData.append('github', github);
    formData.append('correo', correo);

    return this._http.post(global.url + 'createColaborador', formData);
  }

  public findColaborador(text:string, page: number):Observable<any>{
    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if(page !== undefined){
      params = params.set('page', page)
    }
  return this._http.get(this.url+ 'searchColaboradores', {params: params});
  }

  public findAllColaborador(text:string, page: number):Observable<any>{
    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if(page !== undefined){
      params = params.set('page', page)
    }
  return this._http.get(this.url+ 'searchAllColaboradores', {params: params});
  }

  public findExcludeColaborador(text:string, page: number, ids: string):Observable<any>{
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
  return this._http.get(this.url+ 'searchExcludeColaboradores', {params: params});
  }

  public findExcludeProyectColaborador(text:string, page: number, ids: string, key_proyecto: number):Observable<any>{
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
  return this._http.get(this.url+ 'searchExcludeProyectColaboradores', {params: params});
  }
  
  public registrarEpica(nombre:string, proyecto: string, descripcion:string): Observable<any>{
    return this._http.post(global.url + 'createEpica',
    {nombre:nombre, proyecto:proyecto, descripcion:descripcion});
  }

  public findEpica(text:string, page: number):Observable<any>{
    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if( page !== undefined){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchEpicas', {params: params});
  }


  public registrarTarea(nombre:string, descripcion:string, key_epica:string, key_sprint:string, key_proyecto:string, key_colaborador:string, key_area: string): Observable<any>{
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('key_epica', key_epica);
    formData.append('key_sprint', key_sprint);
    formData.append('key_proyecto', key_proyecto);
    formData.append('key_area', key_area);
    if(key_colaborador !== ""){
      formData.append('key_colaborador', key_colaborador);
    }else{
      formData.append('key_colaborador', "0");
    }
    return this._http.post(global.url + 'createTarea', formData);
  }

  public findTarea(text:string, page: number):Observable<any>{
    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if( page !== undefined ){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchTareas', {params: params});
  }

  
  public ableMember(id_equipo:number, key_colab: number): Observable<any>{
    return this._http.post(global.url + 'ableMember',
    {id_equipo:id_equipo, key_colab:key_colab});
  }

  public disableMember(id_tarea:number, key_colab: number): Observable<any>{
    return this._http.post(global.url + 'disable_Colaborador_Tarea',
    {id_tarea:id_tarea, key_colab:key_colab});
  }

  public disableMemberEquipo(id_equipo:number, key_colab: number): Observable<any>{
    return this._http.post(global.url + 'disableMember',
    {id_equipo:id_equipo, key_colab:key_colab});
  }

  public ableMemberEquipo(id_equipo:number, key_colab: number): Observable<any>{
    return this._http.post(global.url + 'ableMember',
    {id_equipo:id_equipo, key_colab:key_colab});
  }

  public ableMemberTarea(id_tarea:number, key_colab: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('id_tarea', id_tarea)
    params = params.set('key_colab', key_colab)
    return this._http.get(global.url + 'able_Colaborador_Tarea', {params: params});
  }

  public disableMemberTarea(id_tarea:number, key_colab: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('id_tarea', id_tarea)
    params = params.set('key_colab', key_colab)
    return this._http.get(global.url + 'disable_Colaborador_Tarea', {params: params});
  }

  public tareaStatus(id_tarea: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('id_tarea', id_tarea);
    return this._http.get(global.url + 'tarea_status', {params: params});
  }

  public getEquipoStatus(id_equipo:number): Observable<any>{
    return this._http.post(global.url + 'equipoStatus',
    {id_equipo:id_equipo});
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

  public findTicket(text:string, page: number):Observable<any>{
    let params = new HttpParams();
    if(text!==''){
    params = params.set('text', text);
    }
    if( page !== undefined){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchTickets', {params: params});
  }

  public registrarPrioridad(nombre:string): Observable<any>{
    return this._http.post(global.url + 'createPrioridad',
    {nombre:nombre});
  }

  public getProyectos(): Observable<any>{
    return this._http.get(global.url + 'getProyectos');
  }

  public getPaginationProyectos(page: number): Observable<any>{
    let params = new HttpParams();
    if(page !== undefined){
    params = params.set('page', page);
    }
    return this._http.get(global.url + 'getPaginationProyectos', {params: params});
  }

  public getPaginationUsers(page: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getUsersPaginate', {params:params});
  }

  public getPaginationTareaColab(id_colab:number, page: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('id_colab', id_colab)
    return this._http.get(global.url + 'getTareasColab', {params:params});
  }

  public createHistorial(id_tarea:number, descripcion: string): Observable<any>{
    return this._http.post(global.url + 'createStatusTarea',
    {id_tarea:id_tarea, descripcion:descripcion});
  }

  public getEquipos(): Observable<any>{
    return this._http.get(global.url + 'getEquipos');
  }

  public getExcludeEquipos(): Observable<any>{
    return this._http.get(global.url + 'getExcludeEquipos');
  }

  public getPaginationEquipos(page: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getPaginationEquipos', {params: params});
  }

  public getColaboradores(): Observable<any>{
    return this._http.get(global.url + 'getColaboradores');
  }

  public getPaginationColaboradores(page: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getPaginationColaboradores', {params: params});
  }

  public getEstatusTareas(): Observable<any>{
    return this._http.get(global.url + 'getEstatusTareas');
  }

  public getPaginationEstatusTareas(page: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getPaginationEstatusTareas', {params: params});
  }

  public getPrioridades(): Observable<any>{
    return this._http.get(global.url + 'getPrioridades');
  }

  public getPaginationPrioridades(page: number): Observable<any>{
    let params = new HttpParams();
    params = params.set('page', page);
    return this._http.get(global.url + 'getPaginationPrioridades', {params: params});
  }

  public getSprints(): Observable<any>{
    return this._http.get(global.url + 'getSprints');
  }

  public sprintProyect(key_proyecto: number):Observable<any>{
    let params = new HttpParams();
    params = params.set('key_proyecto', key_proyecto);
    return this._http.get(global.url + 'sprintProyect', {params: params});
  }

  public epicaProyect(key_proyecto: number):Observable<any>{
    let params = new HttpParams();
    params = params.set('key_proyecto', key_proyecto);
    return this._http.get(global.url + 'epicaProyect', {params: params});
  }

  public colabsProyect(page:number, key_proyecto: number):Observable<any>{
    let params = new HttpParams();
    params = params.set('key_proyecto', key_proyecto);
    params = params.set('page', page);
    return this._http.get(global.url + 'colabsProyecto', {params: params});
  }

  public finishTarea(id_tarea:string): Observable<any>{
    return this._http.post(global.url + 'finishTarea',
    {id_tarea:id_tarea});
  }

  public undoFinishTarea(id_tarea:string): Observable<any>{
    return this._http.post(global.url + 'undoFinishTarea',
    {id_tarea:id_tarea});
  }

  public getEpicas(): Observable<any>{
    return this._http.get(global.url + 'getEpicas');
  }

  public getPaginationEpicas(page:number): Observable<any>{
    let params = new HttpParams();
    if(page !== undefined){
      params = params.set('page', page);
    }
    return this._http.get(global.url + 'getPaginationEpica', {params: params});
  }

  public getTareas(): Observable<any>{
    return this._http.get(global.url + 'getTareas');
  }  

  public getTareasBuzon(id:number): Observable<any>{
    let params = new HttpParams();
    params = params.set('key_colaborador', id);
    return this._http.get(global.url + 'getTareasBuzon', {params: params});
  }  

  public getTareasProgreso(id:number): Observable<any>{
    let params = new HttpParams();
    params = params.set('key_colaborador', id);
    return this._http.get(global.url + 'getTareasProgreso', {params: params});
  }  

  public getTareasProbando(id:number): Observable<any>{
    let params = new HttpParams();
    params = params.set('key_colaborador', id);
    return this._http.get(global.url + 'getTareasProbando', {params: params});
  }  

  public getTareasRealizadas(id:number): Observable<any>{
    let params = new HttpParams();
    params = params.set('key_colaborador', id);
    return this._http.get(global.url + 'getTareasRealizadas', {params: params});
  }  

  public changeStatusTarea(id_tarea:number, key_tarea_status:number): Observable<any>{
    return this._http.post(global.url + 'changeTareaStatus',
    {id_tarea:id_tarea, key_tarea_status:key_tarea_status});
  }

  public getPaginationTareas(page:number): Observable<any>{
    let params = new HttpParams();
    if(page !== undefined){
      params = params.set('page', page);
    }
    return this._http.get(global.url + 'getPaginationTareas', {params: params});
  }

/*
  public updateProyecto(id_proyecto:string, nombre: string, key_equipo: string, imagen: string, detalles:string): Observable<any>{
    return this._http.post(global.url + 'updateProyecto',
    {id_proyecto:id_proyecto, nombre:nombre, key_equipo:key_equipo, imagen:imagen, detalles:detalles});
  }
*/

  public updateProyecto(id_proyecto:string, nombre: string, key_equipo: string, imagen: string, detalles:string): Observable<any>{
    const formData = new FormData();
    formData.append('id_proyecto', id_proyecto);
    formData.append('nombre', nombre);
    formData.append('key_equipo', key_equipo);
    formData.append('foto', imagen);
    formData.append('detalles', detalles);
    return this._http.post(global.url + 'updateProyecto', formData);
  }

  public findEquipo(text:string, page:number):Observable<any>{
    let params = new HttpParams();
    if(text !== ''){
      params = params.set('text', text);
    }

    if(page !== undefined){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchEquipos', {params: params});
  }

  public updateEquipo(id_equipo:string, nombre: string, key_colab:string): Observable<any> {
    return this._http.post(global.url + 'updateEquipo',
     {id_equipo:id_equipo, nombre: nombre, key_colab:key_colab});
  }

  public ableColaborador(id_colab:string): Observable<any> {
    return this._http.post(global.url + 'able_Colaborador',
     {id_colab:id_colab});
  }

  public disableColaborador(id_colab:string): Observable<any> {
    return this._http.post(global.url + 'disable_Colaborador',
     {id_colab:id_colab});
  }

 /* public updateColaborador(id_colab:string, nombre:string, telefono:string, foto:any, github:string, correo:string): Observable<any>{
    return this._http.post(global.url + 'updateColaborador',
    {id_colab:id_colab, nombre:nombre, telefono:telefono, foto:foto, github:github, correo:correo});
  }*/

  public updateColaborador(id_colab:string, nombre:string, telefono:string, foto:any, github:string, correo:string): Observable<any>{
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
    return this._http.post(global.url + 'updateColaborador', formData);
  }

  public updateArea(id_area:string, nombre:string): Observable<any>{
    return this._http.post(global.url + 'updateArea',
    {id_area:id_area, nombre:nombre});
  } 

  public getAreas(): Observable<any>{
    return this._http.get(global.url + 'getAreas');
  }

  public getPaginationAreas(page: number): Observable<any>{
    let params = new HttpParams();
    if(page !== undefined){
    params = params.set('page', page);
    }
    return this._http.get(global.url + 'getPaginationAreas', {params: params});
  }

  public findArea(text:string, page:number):Observable<any>{
    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if( page !== undefined ){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchAreas', {params: params});
  }

  public updateEstatusTarea(id_estatus:string, nombre:string): Observable<any>{
    return this._http.post(global.url + 'updateEstatusTarea',
    {id_estatus:id_estatus, nombre:nombre});
  }

  public findEstatusTarea(text:string, page:number):Observable<any>{
    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if( page !== undefined ){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchEstatusTareas', {params: params});
  }

  public updatePrioridad(id_prioridad:string, nombre:string): Observable<any>{
    return this._http.post(global.url + 'updatePrioridad',
    {id_prioridad:id_prioridad, nombre:nombre});
  }

  public findPrioridad(text:string, page:number):Observable<any>{
    let params = new HttpParams();
    if(text!==''){
      params = params.set('text', text);
    }
    if( page !== undefined ){
      params = params.set('page', page);
    }
  return this._http.get(this.url+ 'searchPrioridades', {params: params});
  }

  public updateSprint(id_sprint:string, nombre:string, descripcion:string, key_proyecto:string): Observable<any>{
    return this._http.post(global.url + 'updateSprint',
    {id_sprint:id_sprint, nombre:nombre, descripcion:descripcion, key_proyecto:key_proyecto});
  }

  public updateEpica(id_epica:string, nombre:string, proyecto: string, descripcion:string): Observable<any>{
    return this._http.post(global.url + 'updateEpica',
    {id_epica:id_epica, nombre:nombre, proyecto:proyecto, descripcion:descripcion});
  }

  public updateTarea(id_tarea:string, nombre:string, descripcion:string, key_colaborador:number, key_tarea_status:number): Observable<any>{
    return this._http.post(global.url + 'updateTarea',
    {id_tarea:id_tarea, nombre:nombre, descripcion:descripcion, key_colaborador:key_colaborador, key_tarea_status:key_tarea_status});
  }

  public getModules():Observable<any>{
    return this._http.get(global.url + 'getModules');
  }

  public getModuleOptionsByUser(id_user: number, id_module: number):Observable<any>{
    let params = new HttpParams();
    params = params.set('id_user', id_user);
    params = params.set('id_module', id_module);
    return this._http.get(global.url + 'getAccesModules', {params: params});
  }

  public getModuleOptionsByUser22(id_user: number, id_module: number):Observable<any>{
    let params = new HttpParams();
    params = params.set('id_user', id_user);
    params = params.set('id_module', id_module);
    return this._http.get(global.url + 'getAccesModules', {params: params});
  }

  public getExportTareas(key_proyecto: number): Observable<string> {
    let params = new HttpParams();
    params = params.set('key_proyecto', key_proyecto);

    // Indica que esperas una respuesta de tipo texto (para capturar el encabezado)
    return this._http.get(global.url + 'ExportTareasProyecto', {
      params: params,
      responseType: 'text' // Indica el tipo de respuesta esperada (texto)
    });
  }

  public getReportTareas():Observable<any>{
    return this._http.get(global.url + 'getReportTareasProyecto');
  }
  

}
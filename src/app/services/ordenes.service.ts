import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import swal from 'sweetalert';
import { ActividadModel } from '../models/actividadModel';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  orden : ActividadModel;
  URL : string;
  token : string

  constructor(
    private _http : HttpClient,
    private _userServices : UserService
  ) {
    this.URL = GLOBAL.url;
    this.token = this._userServices.getToken();
  }
  /************************************************************************ */
                                //CLIENTES//
  /************************************************************************ */
  
  //Crear Ordenes para clientes
  crearOrdenCliente(orden:ActividadModel):Observable<any>{
    let params = JSON.stringify(orden);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'activity/saveCliente', params, {headers:headers}).pipe(
      map((resp:any)=>{
        console.log(resp);
        return resp;
      })
    );
  }
  //Listar  Ordenes para los clientes
  listarOrdenesSinPaginacionClientes(tercero):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token );
    return this._http.get(this.URL+'activity/listarActividadesClientes/'+tercero, {headers:headers});                               
  }

  
  //Listar Ordenes por estado para los clientes


  listarOrdenClienteEstado(tercero:string, estado:string, page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'activity/listarActividadesClientesestado/'+tercero+'/'+estado+'/'+page, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );  
  }

  //Listar una sola orden para el cliente
  listarUnaOrdenParaelCliente(tercero:string, id:string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token );
    return this._http.get(this.URL+'activity/listarActividadCliente/'+tercero+'/'+id, {headers:headers})                                   
  }
  //Gestionar Orden Cliente
  gestionOrdenCliente(orden:ActividadModel, idOrden){
    let params = JSON.stringify(orden);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'activity/gestionActividadCliente/'+idOrden, params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )                               
  }
  //Añadir Recursos a la Actividad para el cliente
  anadirRecursoActividadCliente(orden:ActividadModel, id:string):Observable<any>{
    let params = JSON.stringify(orden);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'activity/anadirRecursoCliente/'+id, params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )                                   
  }
  //Eliminar Recursos de la actividad para el cliente
  eliminarRecursoActividadCliente(orden:ActividadModel, id:string, index):Observable<any>{
    let params = JSON.stringify(orden);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'activity/deleteRecursoClienteActividad/'+id+'/'+index, params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )                                   
  }
}

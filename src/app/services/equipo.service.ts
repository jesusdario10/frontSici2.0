import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import swal from 'sweetalert';
import { UserService } from './user.service';
import { EquipoModel } from '../models/equipoModel';




@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  public equipo : EquipoModel;
  public URL : string;
  public token;

  constructor(
    private _http : HttpClient,
    private _userServices : UserService
  ){
    this.URL = GLOBAL.url;
    this.token = this._userServices.getToken(); 
  }
  //Crear Equipos para clientes
  createEquipoCliente(equipo:EquipoModel):Observable<any>{
    let params = JSON.stringify(equipo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'equipo/save', params, {headers:headers}).pipe(
      map((resp:any)=>{
        console.log(resp);
        return resp;
      })
    );
  }
  //Listar Cargos para los clientes
  listarEquiposClientes(page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'equipo/listarEquiposCliente/'+page, {headers:headers});
  }
  //Buscar mediante el Input equipos para los clientes
  buscarEquiposInputDinamico(terminio:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', this.token);
    return this._http.get(this.URL+'busqueda/equipos/'+terminio, {headers:headers});                               
  }
  //listar Un Equipo para el cliente
  listarUnSoloEquipoCliente(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'equipo/listarEquipoCliente/'+id, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );                               
  }
  //Actualizar Equipos del cliente
  UpdateEquiposCliente(equipo:EquipoModel, id):Observable<any>{
    let params = JSON.stringify(equipo);

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'equipo/updateEquiposclientes/'+id, params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )
               
                                   

  }
}

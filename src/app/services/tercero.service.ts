import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import swal from 'sweetalert';
import { TerceroModel } from '../models/terceroModel';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TerceroService {
  public tercero : TerceroModel;
  public token;
  public URL;


  constructor(
    private _http : HttpClient,
    private _userServices : UserService
  ) {
    this.URL = GLOBAL.url;
    this.token = this._userServices.getToken();
  }
  //Crear Terceros
  crearTercero(tercero:TerceroModel):Observable<any>{
    let params = JSON.stringify(tercero);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'tercero/save', params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )                               
  }

  //Listar Tercero para Supersu
  listarTerceros(page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'tercero/terceros/'+page, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );  
  }
  //listar Terceros sin paginado
  listarTercerossinPaginado(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
     return this._http.get(this.URL+'tercero/tercerossinpaginado', {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    ); 
  }

  //Buscar mediante el Input terceros 
  buscarTerceroaInputDinamico(termino:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'busqueda/terceros/'+termino, {headers:headers});
  }
  
}
 
 


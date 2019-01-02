import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import swal from 'sweetalert';
import { UserService } from './user.service';
import { ConsecutivoModel } from '../models/consecutivoModel';

@Injectable({
  providedIn: 'root'
})
export class ConsecutivoService {
  public consecutivo: ConsecutivoModel;
  public token;
  public URL; 

  constructor(
    private _http : HttpClient,
    private _userServices : UserService
  ) {
    this.URL = GLOBAL.url;
    this.token = this._userServices.getToken();
  }
  //Crear Consecutivo
  crearConsecutivo(consecutivo:ConsecutivoModel):Observable<any>{
    let params = JSON.stringify(consecutivo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'consecu/save', params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )                               
  }
  //Listar Consecutivos 
  listarConsecutivos(page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'consecu/listartodos/'+page, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );  
  }
  //Buscar mediante el Input Consecutivos pero por nombre de cliente
  buscarInputDinamico(termino:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'busqueda/consecutivos/'+termino, {headers:headers})                               ;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import swal from 'sweetalert';
import { UserService } from './user.service';
import { SuministroModel } from '../models/suministroModel';

@Injectable({
  providedIn: 'root'
})
export class SuministroService {
  public token;
  public URL;

  constructor(
    private _http : HttpClient,
    private _userServices : UserService,
  ) {
    this.URL = GLOBAL.url;
    this.token = this._userServices.getToken();
  }

  //*************CLIENTS******************** */

  //guardar Suministros para clientes
  saveSuministroClient(suministro:SuministroModel):Observable<any>{
    let params = JSON.stringify(suministro);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'suministro/save', params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )                               
  }

  //Listar todos los suministros de un cliente sin paginacion
  listSuministrosClientSinPaginacion(tercero:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', this.token);
    return this._http.get(this.URL+'suministro/listClient/'+tercero, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp
      })
    )
  }

}

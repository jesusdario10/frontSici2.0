import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators"; 
import { throwError } from "rxjs/internal/observable/throwError"; 
import { UserService } from './user.service';
import { CcostoModel } from '../models/ccostoModel';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class CcostosService {
  public URL : string;
  public token;
  public ccosto: CcostoModel

  constructor(
    private _http : HttpClient,
    private _userServices : UserService,
  ) {
    this.URL = GLOBAL.url;
    this.token = this._userServices.getToken();
   }

  //Crear Ubicacion para clientes para clientes
  createCcostoCliente(ccosto:CcostoModel):Observable<any>{
    let params = JSON.stringify(ccosto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.token);
  
    return this._http.post(this.URL+'ccostos/create', params, {headers:headers}).pipe(
      map((resp:any)=>{
        console.log(resp);
        return resp;
      })
    );
  }
  //Listar Ubicaciones para los clientes de manera paginada
  listarCcostoPageCliente(page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.token);
    return this._http.get(this.URL+'ccostos/listpage/'+page, {headers:headers});
  }
  //Listar las ubicaciones parsa los clientes sin paginado
  listarCentrosdecostosinPaginado(tercero:string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.token);
    return this._http.get(this.URL+'ccostos/lists/'+tercero, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )
  }

  //Buscar mediante el Input centros de costo para los clientes
  buscarCcostosInputDinamico(termino:string):Observable<any>{
  
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'busqueda/ccostos/'+termino, {headers:headers})                               ;
  }
}

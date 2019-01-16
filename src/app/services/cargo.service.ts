import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import swal from 'sweetalert';
import { CargoModel } from '../models/cargoModel';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class CargoService {
  public cargo : CargoModel;
  public URL : string;
  public token;

  constructor(
    private _http : HttpClient,
    private _userServices : UserService
  ) {
    this.URL = GLOBAL.url;
    this.token = this._userServices.getToken();
   }

   /************************************************** */

                /******CLIENTES************/

   /*************************************************** */
   listarCargoClienteSinpaginacion(tercero:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'cargo/listcarclientnopag/'+tercero, {headers})                               
   }

   listarUnCArgoparaclientessies(tercero, id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
      return this._http.get(this.URL+'cargo/uncargoCliente/'+tercero+'/'+id, {headers})  
   }

   /******************************************************* */

              /********ADMINISTRADORES*********** */

   /******************************************************* */

  //Crear Cargos para clientes
  createCargo(cargo:CargoModel):Observable<any>{
    let params = JSON.stringify(cargo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);

    return this._http.post(this.URL+'cargo/save', params, {headers:headers}).pipe(
      map((resp:any)=>{
        console.log(resp);
        return resp;
      })
    );
  }
  //Listar Cargos para los clientes paginado
  listarCargosClientes(page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'cargo/listarcargocliente/'+page, {headers:headers});
  }
  //Buscar mediante el Input cargos para los clientes
  buscarCargosInputDinamico(terminio:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'busqueda/cargos/'+terminio, {headers:headers})                               ;
  }
  //Buscar un solo cargo para poder editarlo este es para clientes
  buscarUnCargoCliente(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'cargo/listarcargo/'+id, {headers:headers})
  }
  //Editar Cargos para clientes
  editarCargoCliente(cargo:CargoModel, id):Observable<any>{
    let params = JSON.stringify(cargo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);

    return this._http.post(this.URL+'cargo/update/'+id, params, {headers:headers}).pipe((
      map((resp:any)=>{
        console.log(resp);
        return resp
      })
    ))

  }







  //***************************Para Supersu*******************************************/


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import swal from 'sweetalert';
import { UserService } from './user.service';
import { EquipoModel } from '../models/equipoModel';
import { SubirArchivosService } from './subir-archivos.service';




@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  public equipo : EquipoModel;
  public URL : string;
  public token;
  public datosAsubir;

  constructor(
    private _http : HttpClient,
    private _userServices : UserService,
    private _subirArchivos : SubirArchivosService
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
  //Listar Equipos para los clientes de manera paginada
  listarEquiposClientes(page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'equipo/listarEquiposCliente/'+page, {headers:headers});
  }
  //Buscar mediante el Input equipos para los clientes por el serial
  buscarEquiposInputDinamico(termino:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', this.token);
    return this._http.get(this.URL+'busqueda/equipos/'+termino, {headers:headers});                               
  }
  //Buscar mediante el Input equipos para los clientes por el tag
  buscarEquiposInputDinamicoporTag(termino:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', this.token);
    return this._http.get(this.URL+'busqueda/tag/'+termino, {headers:headers});                               
  }
  //Listar todos los equipos de un cliente en orden alfabetico
  listarTodoslosEquiposdelClientesinPaginacion(tercero:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'equipo/listarEquiposClientesinPaginacion/'+tercero, {headers:headers});                                 
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
  //subir el archivo excel al backend
  subirEquiposxlsx(archivo:File,  tercero, tipoEquipo){
    this._subirArchivos.subirArchivo(archivo, 'equipo', tercero, tipoEquipo)
      .then(resp=>{
        let mensaje:any = resp;
        this.leerDatosCargosJson(resp)
        if(mensaje.message == "Archivo errado"){
          swal('Error', mensaje.message, 'error')
        }else{
          swal('Exito', "Archivo Recibido", 'success')
        }
       
      })
      .catch(resp=>{
        console.log(resp);
      })
  }
  //agregar los datos obtenidos a una variable
  leerDatosCargosJson(datos){
    this.datosAsubir = datos;
  }  
  //de esta forma los puedo leer en el componente
  RevisarDatos(){
    return this.datosAsubir;
  }  
  //de esta manera envio el json al backend para crear los equipos en la db
  importarEquipos(equipos:any[], tercero:string, tipoEquipo){
    let params = JSON.stringify(equipos);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
     return this._http.post(this.URL+'import/importar/equipos/'+tercero+'/'+tipoEquipo, params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );                               
  }  

}

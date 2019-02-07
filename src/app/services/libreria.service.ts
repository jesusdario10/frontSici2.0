import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import swal from 'sweetalert';
import { UserService } from './user.service';
import { LibreriaModel } from '../models/libreriaModel';
import { SubirArchivosService } from './subir-archivos.service';



@Injectable({
  providedIn: 'root'
})
export class LibreriaService {
  public libreria : LibreriaModel;
  public token;
  public URL;
  public datosAsubir;

  constructor(
    private _http : HttpClient,
    private _userServices : UserService,
    private _subirArchivos : SubirArchivosService
  ) {
    this.URL = GLOBAL.url;
    this.token = this._userServices.getToken();
  }

  /***************CLIENTES************************/

  //Crear librerias para los clientes
  createLibreriaCliente(libreria:LibreriaModel):Observable<any>{
    let params = JSON.stringify(libreria);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'libreria/createClient', params, {headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );                             
  }
  //Listar todas las librerias para los clientes
  listLibreriasCliente(page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'libreria/listarClientes/'+page, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );                               
  }
  //Listar todas las librerias del cliente sin paginacion y en orden alfabetico
  listarLibreriasSinPaginacionCliente(tercero:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'libreria/listarSinPaginacionClientes/'+tercero, {headers:headers});                               
  }
  //Listar Una sola libreria del cliente
  listarUnaLibreriaCliente(libreria:LibreriaModel):Observable<any>{
    let params = JSON.stringify(libreria);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'libreria/listarUnaClientes', params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp.libreria
      })
    );
  }
  //Buscar mediante el Input dinamico librerias para los clientes
  buscarLibreriasInputDinamico(termino:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'busqueda/librerias/'+termino, {headers:headers})                               ;
  }
  //Editar Libreria
  editarLibreriaCliente(libreria:LibreriaModel):Observable<any>{
    let params = JSON.stringify(libreria);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'libreria/editClientes', params, {headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )                               
  }
  //subir archivo de Librerisas desde un archivo xlsx
  subirLibreriasxlsx(archivo:File,  tercero){
    this._subirArchivos.subirArchivo(archivo, 'libreria', tercero)
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
  //de esta manera envio el json al backend para crear los librerias en la db
  importarLibrerias(cargos:any[], tercero:string){
    let params = JSON.stringify(cargos);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
     return this._http.post(this.URL+'import/importar/libreria/'+tercero, params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );                               
  }      
}

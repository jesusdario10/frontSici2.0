import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators"; 
import { throwError } from "rxjs/internal/observable/throwError"; 
import swal from 'sweetalert';
import { UbicacionModel } from '../models/ubicacionModel';
import { UserService } from './user.service';
import { SubirArchivosService } from './subir-archivos.service';



@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  public ubicacion : UbicacionModel;
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
  //Crear Ubicacion para clientes para clientes
  createUbicacionCliente(ubicacion:UbicacionModel):Observable<any>{
    let params = JSON.stringify(ubicacion);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
  
    return this._http.post(this.URL+'ubicacion/save', params, {headers:headers}).pipe(
      map((resp:any)=>{
        console.log(resp);
        return resp;
      })
    );
  }
  //Listar Ubicaciones para los clientes de manera paginada
  listarUbicacionesCliente(page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'ubicacion/listarubicacionclientes/'+page, {headers:headers});
  }
  //Listar Ubicaciones para los clientes( este listado es el que aparece en el autocomplete)
   listarUbicacionesClienteautocomplete():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'ubicacion/listarubicacionautocomplete/', {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )
  }
  //Listar las ubicaciones parsa los clientes sin paginado
  listarUbicacionesClienteSinPaginado(tercero:string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'ubicacion/listarubicacionesClienteSinPaginado/'+tercero, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )
  }

  //Buscar mediante el Input cargos para los clientes
  buscarUbicacionesInputDinamico(terminio:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'busqueda/ubicaciones/'+terminio, {headers:headers})                               ;
  }
  //Editar Cargos para clientes
  editarUbicacionCliente(ubicacion:UbicacionModel, id):Observable<any>{
    let params = JSON.stringify(ubicacion);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
  
    return this._http.post(this.URL+'ubicacion/update/'+id, params, {headers:headers}).pipe((
      map((resp:any)=>{
        console.log(resp);
        return resp
      })
    ));
  }
  //Buscar un solo cargo para poder editarlo este es para clientes
  buscarUnaUbicacionCliente(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'ubicacion/listarubicacion/'+id, {headers:headers})
  }  
  //subir archivo de Cargos desde un archivo xlsx
  subirUbicacionesxlsx(archivo:File,  tercero, tipoEquipo){
    this._subirArchivos.subirArchivo(archivo, 'cargo', tercero, tipoEquipo)
      .then(resp=>{
        let mensaje:any = resp;
       this.leerDatosUbicacionJson(resp)
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
  leerDatosUbicacionJson(datos){
    this.datosAsubir = datos;
  }
  //de esta forma los puedo leer en el componente
  RevisarDatos(){
    return this.datosAsubir;
  } 
  //de esta manera envio el json al backend para crear los cargos en la db
  importarUbicacion(ubicaciones:any[], tercero:string){
    let params = JSON.stringify(ubicaciones);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
     return this._http.post(this.URL+'import/importar/ubicacion/'+tercero, params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );                               
  }     
  
}

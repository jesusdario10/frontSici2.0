import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import swal from 'sweetalert';
import { ActividadModel } from '../models/actividadModel';
import { UserService } from './user.service';
import { SubirArchivosService } from './subir-archivos.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  orden : ActividadModel;
  URL : string;
  token : string;
  datosAsubir;

  constructor(
    private _http : HttpClient,
    private _userServices : UserService,
    private _subirArchivos : SubirArchivosService
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

                                //***********GRAFICOS CLIENTE**********/

  //Listar ordenes por fecha para clientes en grafico de donas sin paginado
  listarporFechaDonaCliente(tercero:string, fechaInicial:string, fechaFinal:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token );

    return this._http.get(this.URL+'activity/listarActividadesClientesFechasSinPaginado/'+tercero+'/'+fechaInicial+'/'+fechaFinal, {headers:headers})   
  }
  //Listar Ordenes por fecha para clientes en grafico de donas con paginado
  listarporFechaDonaClientePaginado(tercero:string, fechaInicial:string, fechaFinal:string, page:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token );

    return this._http.get(this.URL+'activity/listarActividadesClientesFechasSinPaginado/'+tercero+'/'+fechaInicial+'/'+fechaFinal+'/'+page, {headers:headers})   
  }
  //Listar Ordenes por fecha para clientes en grafico de linea sin paginacion
  listarporFechaLineaClienteNopaginado(tercero:string, fechaInicial:string, fechaFinal:string, ubicacion:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token );
    return this._http.get(this.URL+'activity/listarActividadesClientesFechasSinPaginadoLinea/'+tercero+'/'+fechaInicial+'/'+fechaFinal+'/'+ubicacion, {headers:headers})  
  }
  //Listar Ordenes por fecha para clientes en grafico de linea con paginacion
  listarporFechaLineaClienteSipaginado(tercero:string, fechaInicial:string, fechaFinal:string, ubicacion:string, estado:string, page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token );

    return this._http.get(this.URL+'activity/listarActividadesClientesFechasConPaginadoLinea/'+tercero+'/'+fechaInicial+'/'+fechaFinal+'/'+ubicacion+'/'+estado+'/'+page, {headers:headers})  
  }


  
                                        /*TERMINAN LOS GFRAFICO CLIENTE*/


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
  /*******************************************************************************************************/
  /*************************************GESTIONAR LA SUBIDA DE ARCHIVOS***********************************/
  /*******************************************************************************************************/
  //subir archivo de Cargos desde un archivo xlsx
  subirOrdenesxlsx(archivo:File,  tercero){
    this._subirArchivos.subirArchivo(archivo, 'orden', tercero)
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
  //de esta manera envio el json al backend para crear los cargos en la db
  importarOrden(ordenesparaImport:any[], tercero:string){
    let params = JSON.stringify(ordenesparaImport);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
     return this._http.post(this.URL+'import/importar/orden/'+tercero, params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );                               
  }    
}

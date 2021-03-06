import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import swal from 'sweetalert';
import { CargoModel } from '../models/cargoModel';
import { UserService } from './user.service';
import { SubirArchivosService } from './subir-archivos.service';





@Injectable({
  providedIn: 'root'
})
export class CargoService {
  public cargo : CargoModel;
  public URL : string;
  public token;
  public datosAsubir;


  constructor(
    private _http : HttpClient,
    private _userServices : UserService,
    private _subirArchivos : SubirArchivosService
  ) {
    this.URL = GLOBAL.url;
    this.token = this._userServices.getToken();
    
   }

   /************************************************** */

                /******CLIENTES************/

   /*************************************************** */

   //Crear cargos clientes
   crearCargoCliente(cargo:CargoModel):Observable<any>{
    let params = JSON.stringify(cargo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'cargo/saveC', params, {headers:headers}).pipe(
      map((resp:any)=>{
        console.log(resp);
        return resp;
      })
    );        
   }

   //Update Cargo para clientes 
   updateCargoCliente(cargo:CargoModel, id):Observable<any>{
    let params = JSON.stringify(cargo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.post(this.URL+'cargo/updateC/'+id, params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )
   }


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

  //Listar Cargos para los clientes paginado empujando ando
  listarCargosClientes(page=null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'cargo/listarcargocliente/'+page, {headers:headers});
  }

  //Buscar un solo cargo para poder editarlo 
  buscarUnCargoCliente(id, tercero):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.token);
    return this._http.get(this.URL+'cargo/uncargoCliente/'+tercero+'/'+id, {headers:headers})
  }

   /******************************************************* */

              /********ADMINISTRADORES*********** */

   /******************************************************* */

  //Crear Cargos 
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

  //Buscar mediante el Input cargos para los clientes
  buscarCargosInputDinamico(terminio:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
    return this._http.get(this.URL+'busqueda/cargos/'+terminio, {headers:headers})                               ;
  }
  //Editar Cargos para admin
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
  
  //subir archivo de Cargos desde un archivo xlsx
  subirCargosxlsx(archivo:File,  tercero, tipoCargo){
    this._subirArchivos.subirArchivo(archivo, 'cargo', tercero, tipoCargo)
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
  importarCargos(cargos:any[], tercero:string){
    let params = JSON.stringify(cargos);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);
     return this._http.post(this.URL+'import/importar/'+tercero, params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );                               
  }




  //***************************Para Supersu*******************************************/


}

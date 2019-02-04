import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { CargoModel } from '../models/cargoModel';
import { UserService } from './user.service';
import { map, catchError } from "rxjs/operators";




@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {
  public URL : string;
  public token;


  constructor(
    private _userServices : UserService,
  ) {
    this.URL = GLOBAL.url;
    this.token = this._userServices.getToken();
   }

  subirArchivo(archivo : File, tipo, tercero){
    return new Promise ((resolve, reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append('archivo', archivo, archivo.name);
  
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
          if(xhr.status ===200){
            console.log("archivo subido");
            resolve(JSON.parse(xhr.response));
            console.log(resolve);
          }else{
            console.log('fallo la subida');
            reject(JSON.parse(xhr.response));
          }
        }
      }
      let url = this.URL+'import/csv/'+tercero+'/'+tipo;

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.token);
      xhr.send(formData)
      
    });

  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';
import { map, catchError } from "rxjs/operators"; 
import { throwError } from "rxjs/internal/observable/throwError"; 
import swal from 'sweetalert';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url : string;
  public identity;
  public token;


  constructor(
    public _http:HttpClient
  ) { 
    this.url = GLOBAL.url;
  }
  //servicio de login
  login(user:UserModel, gettoken=null){
    if(gettoken !=null){
      user.gettoken = gettoken;
    }

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('http://localhost:3800/user/login', params, {headers:headers}).pipe(
      map((resp:any)=>{
        return resp
      }),
      catchError(err=>{
        swal('!Ya Existe la Cuenta', err.error.message, 'error');
        return throwError(err) //nos retorna un observable
      })
    );
  }
  //convierte el json string del localstrorage del user en un json
  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
  
    if(identity != undefined){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    
    return this.identity;
  }
    //convierte el json string del localstrorage del token en un json
  getToken(){
    let token =  JSON.parse(localStorage.getItem('token'));

    if(token != undefined){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }
  
}

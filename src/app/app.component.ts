import {Component, OnInit, DoCheck } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck  {
  public identity:any = false;
  constructor(
    private _userServices : UserService,
    private _router : Router
  ) { }
  ngOnInit() {
    this.identity = this._userServices.getIdentity();
  }
  ngDoCheck(){
    let URLactual = window.location.href;
    if(URLactual == 'http://localhost:4200/login' && this.identity != null || URLactual == 'http://localhost:4200/inicio' && this.identity != null || URLactual == 'http://localhost:4200/' && this.identity != null){
      console.log("quieres entrar a donde no debes");
      localStorage.clear();//limpiamos el localStorage para que se cierre la sesion
      this.identity = null;
    }else{
      this.identity = this._userServices.getIdentity();  
    }
     
  }
  //cerrar sesion
  logout(){
    //borra todo lo que hay en el localStorage
    localStorage.clear();
  }

}

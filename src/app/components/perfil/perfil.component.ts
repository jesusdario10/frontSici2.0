import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  public userModel : UserModel;
  public identity : any;
  public passwordAnt : string;
  public passwordNew : string;
  public passwordConfirm : string;


  constructor(
    private UserServices: UserService
  ){

  }
  
  ngOnInit(){
    this.identity = this.UserServices.getIdentity();
    console.log(this.identity);
  }


}

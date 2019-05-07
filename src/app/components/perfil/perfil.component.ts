import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/userModel';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
declare var swal:any;

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

  public form : FormGroup;
  public form2 : FormGroup;
  public formSubmit: boolean;


  constructor(
    private UserServices: UserService,
    private fb: FormBuilder,
  ){

  }
  
  ngOnInit(){
    this.identity = this.UserServices.getIdentity();
    console.log(this.identity);

    //inicializando el formulario
    this.form = this.fb.group({
      nombre : ["", Validators.required ],
      correo: ["", Validators.required ],
      celular: ["", Validators.required ]
    });

    this.form2 = this.fb.group({
      passwordAnt : ["", Validators.required ],
      passwordNew: ["", Validators.required ],
      passwordConfirm: ["", Validators.required ]
    });
  }
  actualizarPerfil(form, perfil){
    const formModel = this.form.value;
    let actualizados : UserModel = {
      nombre : formModel.nombre as string,
      correo : formModel.correo as string,
      celular : formModel.celular as string
    }

    this.UserServices.updateUserPerfil(actualizados, this.identity._id)
        .subscribe((data:any)=>{
          console.log(data);
          this.identity = data.userUpdate;
          swal('Exito', "Datos Actualizados", 'success');
        })
  }
  cambiarPassword(form, password){
    console.log("aun no");
  }


}

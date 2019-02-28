import { Component, OnInit, DoCheck } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroupDirective, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UbicacionModel } from 'src/app/models/ubicacionModel';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { EquipoModel } from 'src/app/models/equipoModel';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal:any;


@Component({
  selector: 'app-equipo-cliente-edit',
  templateUrl: './equipo-cliente-edit.component.html',
  styleUrls: ['./equipo-cliente-edit.component.css']
})
export class EquipoClienteEditComponent implements OnInit {
  public ubicaciones : UbicacionModel[]=[];
  public identity : any;
  public equipo : EquipoModel;
  public tag : any;
  public nombre : any;
  public estado: any;
  public idEquipo : any;
  public fichaTecnica : any;
  public form : FormGroup;
  public formSubmit: boolean;





  constructor(
    private _ubicacionServices : UbicacionService,
    private _equipoServices : EquipoService,
    private _userServices : UserService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) {  

    
  }


  ngOnInit() {
    this.buscarUbicacionesInputAutocomplete();
    this.identity = this._userServices.getIdentity();
    this.listarUnsoloEquipoCliente();
    //inicializando el formulario
    this.form = this.fb.group({
      nombreEdit: [ "", Validators.required ],
      ubiEdit: [ "", Validators.required ],
      estadoE: ["", Validators.required]
    });

  }
  //Listar Cargos de los clientes
  buscarUbicacionesInputAutocomplete(){
    this._ubicacionServices.listarUbicacionesClienteautocomplete()
      .subscribe((datos:any)=>{
        this.ubicaciones = datos.ubicaciones;
        
      })
  }
  //Listar un solo Equipo del cliente
  listarUnsoloEquipoCliente(){
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];
    this.idEquipo = id;
    this._equipoServices.listarUnSoloEquipoCliente(this.idEquipo)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.tag = datos.equipo.tag;
          this.nombre = datos.equipo.nombre_equipo;
          this.estado = datos.equipo.estado;
          this.equipo = datos.equipo;
          this.fichaTecnica = datos.equipo.fichaTecnica;
          
        })
  }
  //Editar Equipo
  editEquipoCliente(form, EquipoFormEDit){
    const formModel = this.form.value;
    let editEquipoCliente: EquipoModel ={
      nombre_equipo :formModel.nombreEdit as string,
      estado :formModel.estadoE as string,
      ubicacion : formModel.ubiEdit as string,
    };
    console.log(editEquipoCliente);

    this._equipoServices.UpdateEquiposCliente(editEquipoCliente, this.idEquipo)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.listarUnsoloEquipoCliente();
          swal('!Exito', "Se ha Editado su Equipo", "success");
        })

  }






}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UbicacionModel } from 'src/app/models/ubicacionModel';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { UserService } from 'src/app/services/user.service';
import { EquipoModel } from 'src/app/models/equipoModel';
import { LibreriaService } from 'src/app/services/libreria.service';
import { LibreriaModel } from 'src/app/models/libreriaModel';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ActividadModel } from 'src/app/models/actividadModel';
declare var swal:any;

@Component({
  selector: 'app-ordenes-cliente-crear',
  templateUrl: './ordenes-cliente-crear.component.html',
  styleUrls: ['./ordenes-cliente-crear.component.css']
})
export class OrdenesClienteCrearComponent implements OnInit {
  identity : any;
  ubicaciones : UbicacionModel[]=[];
  equipos : EquipoModel[]=[];
  librerias : LibreriaModel[]=[];
  
  
  //Formulario
  form : FormGroup;
  formSubmit: boolean;
  


  constructor(
    private _ubicacionService : UbicacionService,
    private _EquipoServices : EquipoService,
    private _UserService : UserService, 
    private _LibreriaService : LibreriaService,
    private _OrdenService : OrdenesService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.identity = this._UserService.getIdentity();
    this.listarUbicacionesCliente();
    this.listarEquiposClienteporTag();
    this.listarLibreriaporNombreSinPaginacion();
   
    //inicializando el formulario
    this.form = this.fb.group({
      fechaRequeridaO : [ "", Validators.required ],
      UbicacionO: [ "", Validators.required ],
      equipoO: [ "", Validators.required ],
      solicitanteO: [ "", Validators.required ],
      prioridadO: [ "", Validators.required ],
      libreriaO: [ "", Validators.required ],
      descripcionO: [ "", Validators.required ],
    });
    
  }
  //Lista las ubicaciones del cliente
  listarUbicacionesCliente(){
    this._ubicacionService.listarUbicacionesClienteautocomplete()
        .subscribe((datos:any)=>{
          this.ubicaciones = datos.ubicaciones;        
        })
  }
  //Lista los Equipos del cliente alfabeticamente por tag
  listarEquiposClienteporTag(){
    this._EquipoServices.listarTodoslosEquiposdelClientesinPaginacion(this.identity.tercero)
        .subscribe((datos:any)=>{
          this.equipos = datos.equipos; 
        })
  }
  //Lista las librerias del cliente
  listarLibreriaporNombreSinPaginacion(){
    this._LibreriaService.listarLibreriasSinPaginacionCliente(this.identity.tercero)
        .subscribe((datos:any)=>{
          this.librerias = datos.librerias;
        })
  }
  //Crear Orden para el Cliente
  crearOrdenCliente(form, OrdenForm){
    const formModel = this.form.value;

    let saveOrden : ActividadModel = {
      fecha_requerida: formModel.fechaRequeridaO as string,
      ubicacion: formModel.UbicacionO as string,
      equipo: formModel.equipoO as string,
      solicitante: formModel.solicitanteO as string,
      prioridad: formModel.prioridadO as string,
      libreria: formModel.libreriaO as string,
      descripcion: formModel.descripcionO as string,
      tercero : this.identity.tercero
    }
    this._OrdenService.crearOrdenCliente(saveOrden)
        .subscribe((datos:any)=>{
          console.log(datos);
          swal("Exito", "Orden Creada", "success"); 
        })
  }



}


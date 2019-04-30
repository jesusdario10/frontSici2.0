import { Component, OnInit } from '@angular/core';
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
import { CcostosService } from 'src/app/services/ccostos.service';
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
  saveOrden : ActividadModel;
  
  
  //Formulario
  form : FormGroup;
  formSubmit: boolean;
  
  selectedEquipo : any;
  selectedCcosto : any;
  selectedUbicacion : any;
  ccostos: any;

  constructor(
    private _ubicacionService : UbicacionService,
    private _EquipoServices : EquipoService,
    private _UserService : UserService, 
    private _LibreriaService : LibreriaService,
    private _OrdenService : OrdenesService,
    private _CcostoService : CcostosService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { }

  ngOnInit() {
  
    this.identity = this._UserService.getIdentity();
    this.listarUbicacionesCliente();
    this.listarLibreriaporNombreSinPaginacion();
    this.listarCcostosSinPaginado();
   
    //inicializando el formulario
    this.form = this.fb.group({
      fechaCreacionO : [ "", Validators.required ],
      fechaRequeridaO : [ "", Validators.required ],
      UbicacionO: [ "", Validators.required ],
      equipoO: [ "", Validators.required ],
      solicitanteO: [ "", Validators.required ],
      prioridadO: [ "", Validators.required ],
      libreriaO: [ "", Validators.required ],
      descripcionO: [ "", Validators.required ],
      ccosto: [ "", Validators.required ],
    });
    
  }
  //metodo para controlar los equipos que se muestran dependiendo de la ubicacion
  seleccionUbicacion(){
    if(this.selectedUbicacion == null){
      this.equipos = null;
      this.selectedEquipo = null;
    }else{

      this.listarEquiposClienteporTagsegunUbicacion();
    }
    
    
  }
  //Lista las ubicaciones del cliente
  listarUbicacionesCliente(){
    this._ubicacionService.listarUbicacionesClienteautocomplete()
        .subscribe((datos:any)=>{
          this.ubicaciones = datos.ubicaciones;        
        })
  }
  //Lista los Equipos del cliente alfabeticamente por tag dependiendo de su ubicacion
  listarEquiposClienteporTagsegunUbicacion(){
    this._EquipoServices.listarTodoslosEquiposdelClientesinPaginacionporUbicacion(this.identity.tercero, this.selectedUbicacion._id)
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
    console.log(formModel.equipoO);
    this.saveOrden = {
      fecha_creacion: formModel.fechaCreacionO as string,
      fecha_requerida: formModel.fechaRequeridaO as string,
      ubicacion: formModel.UbicacionO as string,
      equipo: this.selectedEquipo as string,
      solicitante: formModel.solicitanteO as string,
      prioridad: formModel.prioridadO as string,
      libreria: formModel.libreriaO as string,
      descripcion: formModel.descripcionO as string,
      ccosto : formModel.ccosto as string,
      tercero : this.identity.tercero
    }
    console.log(this.saveOrden);
   this._OrdenService.crearOrdenCliente(this.saveOrden)
        .subscribe((datos:any)=>{
          if(datos.message == "Fecha de creacion no puede ser menor a la fecha requerida"){
            swal("Cuidado", datos.message, "warning");
            return false;
          }else if(datos.message == "Suministre todos los campos requeridos"){
            swal("Cuidado", datos.message, "warning");
          }
          else{
            form.reset();
            swal("Exito", "Orden Creada", "success"); 
          }
    })
  }
  //listar centros de costo sin paginado
  listarCcostosSinPaginado(){
    this._CcostoService.listarCentrosdecostosinPaginado(this.identity.tercero)
        .subscribe((datos:any)=>{
          this.ccostos = datos.ccostos;
        })
  }



}


import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ActividadModel, Recurso } from 'src/app/models/actividadModel';
import { CargoService } from 'src/app/services/cargo.service';
import { UserService } from 'src/app/services/user.service';
import { CargoModel } from 'src/app/models/cargoModel';
import { OrdenesService } from 'src/app/services/ordenes.service';
declare var swal:any;

@Component({
  selector: 'app-ordenes-cliente-gestion',
  templateUrl: './ordenes-cliente-gestion.component.html',
  styleUrls: ['./ordenes-cliente-gestion.component.css']
})
export class OrdenesClienteGestionComponent implements OnInit {
  cargos : CargoModel[]=[];
  idOrden : string;


  //Datos de la orden
  tag : string;
  solicitante : string;
  noOrden: string;
  prioridad : string;

  //Captura de datos para la gestion
  fechaEjecucion: string;
  turno : string;
  descripcionActividad: string;
  estado : string;
  restriccion : string;
  historico: string;
  identity: any;

  //Captura de datos para insertar recurso
  hh:number;
  cargo:string;
  vhora_hombre:number;


  //Tabla de Recursos
  recursos : any[]=[];

   //Formulario
   form : FormGroup;
   formSubmit: boolean;

  constructor(
    private _cargosService : CargoService,
    private _userServices : UserService,
    private _ordenServices : OrdenesService,
    private _cargoService : CargoService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { 
    
  }

  
  
  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    this.listarCargosdelClientes();
    //extraer id Orden
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];
    this.idOrden = id;

    //Traer datos de la orden
    this.listarUnaOrdenCliente();

    //inicializando el formulario
    this.form = this.fb.group({
      hhO : [ 1, Validators.required ]
    });


  }
  //Traer los datos de una orden
  listarUnaOrdenCliente(){
    this._ordenServices.listarUnaOrdenParaelCliente(this.identity.tercero, this.idOrden)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.tag = datos.actividad.equipo.tag;
          this.solicitante = datos.actividad.solicitante;
          this.noOrden = datos.actividad.consecutivo;
          this.prioridad = datos.actividad.prioridad;
          this.fechaEjecucion  = datos.fechas.fecha_ejecucion;
          this.turno  = datos.actividad.turno;
          this.descripcionActividad  = datos.actividad.libreria.descripcion;
          this.restriccion  = datos.actividad.restriccion;
          this.estado  = datos.actividad.estado;
          this.recursos = datos.actividad.recurso;
          this.historico = datos.actividad.historico;
          
        })
  }
  //Gestionar la Orden
  gestionarOrden(){
    let gestionOrdenCliente : ActividadModel = {
      fecha_ejecucion : this.fechaEjecucion as string,
      turno : this.turno as string,
      descripcion : this.descripcionActividad as string,
      restriccion : this.restriccion as string,
      tercero : this.identity.tercero as string,
      estado : this.estado as string,
      historico : this.historico as string
    }
    
    if(gestionOrdenCliente.turno == undefined || gestionOrdenCliente.fecha_ejecucion == "" || gestionOrdenCliente.turno == 'Elija' ){
        swal('Error', "Seleccione el turno y fecha de ejecucion", 'warning')
        return false;
    }else{
      this._ordenServices.gestionOrdenCliente(gestionOrdenCliente, this.idOrden)
          .subscribe((datos:any)=>{
            console.log(datos);
            if(datos.message){
              swal('Error', datos.message, 'warning')
              return false;
            }
            if(datos.actividad){
              swal('Existoo!', "Gestion Realizada", 'success')
            }
      })
    }
  }
  //Listar los cargos para el select de agregar recursos
  listarCargosdelClientes(){
    this._cargosService.listarCargoClienteSinpaginacion(this.identity.tercero)
    .subscribe((datos:any)=>{
      this.cargos = datos.cargos;
    })
  }
  tomarValorHora(value){
    let id = value
    this._cargoService.listarUnCArgoparaclientessies(this.identity.tercero, id )
        .subscribe((datos:any)=>{
          this.vhora_hombre = datos.cargo.vhora_hombre;
          this.cargo = datos.cargo._id;
        })
  }
  //Añadir Recursos a la Actividad para clientes
  agregarRecursos(form, recursosR){
    const formModel = this.form.value;
    let saveRecurso : ActividadModel = {
      recurso: {
        hh: formModel.hhO as number,
        cargo: this.cargo  as string,
        vhora_hombre : this.vhora_hombre as number
      },
      tercero : this.identity.tercero
    }
    console.log(saveRecurso);
    if(saveRecurso.recurso.cargo == undefined || saveRecurso.recurso.hh == undefined || saveRecurso.recurso.vhora_hombre == undefined){
      swal('Error', 'Faltan datos del Recurso', 'error');
      return false;
    }else{
      this._ordenServices.anadirRecursoActividadCliente(saveRecurso, this.idOrden)
        .subscribe((datos:any)=>{
          this.recursos = datos.recurso;
          form.reset();
          this._ordenServices.listarUnaOrdenParaelCliente(this.identity.tercero, this.idOrden)
            .subscribe((datos:any)=>{
              this.recursos = datos.actividad.recurso;
            })             
        })
    }
  }
  //Eliminar un recurso
  eliminarRecurso(index){
    let eliminarRecurso : ActividadModel ={
      tercero: this.identity.tercero
    }
    this._ordenServices.eliminarRecursoActividadCliente(eliminarRecurso, this.idOrden, index )
        .subscribe((datos:any)=>{
          swal('!Exitoo', 'Recurso eliminado correctamente', 'error');
          this._ordenServices.listarUnaOrdenParaelCliente(this.identity.tercero, this.idOrden)
            .subscribe((datos:any)=>{
              this.recursos = datos.actividad.recurso;
            })
        })
  }
  




}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipoModel } from 'src/app/models/equipoModel';
import { EquipoService } from 'src/app/services/equipo.service';
import { UbicacionModel } from 'src/app/models/ubicacionModel';
import { UbicacionService } from 'src/app/services/ubicacion.service';
declare var swal:any;

@Component({
  selector: 'app-equipo-cliente',
  templateUrl: './equipo-cliente.component.html',
  styleUrls: ['./equipo-cliente.component.css']
})
export class EquipoClienteComponent implements OnInit {
  public identity : any;
  public equipos : EquipoModel[]=[];
  public newEquipo : EquipoModel;
  public formSubmit: boolean;

  //Formulario Indicadores
  public form1 : FormGroup;
  //Formulario Transmisores
  public form2 : FormGroup;
  //Formulario Transmisores
  public form3 : FormGroup;  
  

  //Variables de formularios
  tipoEquipo;
  sub_tipo;
  sub_tipo_tipo;
  tipodeltipo;
  funcionamiento;
  ubicaciones : UbicacionModel[]=[];
  selectedUbicacion : any;


  
  constructor(
    private _userServices : UserService,
    private _equipoServices : EquipoService,
    private _ubicacionService : UbicacionService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.listarUbicacionesCliente();
    this.identity = this._userServices.getIdentity();
    //inicializando el formulario
    this.form1 = this.fb.group({
      subtipoFuncionEquipo:["", Validators.required],
      nomenclatura: ["", Validators.required],
      marca : ["", Validators.required],
      serial : [ "", Validators.required ],
      tag: [ "", Validators.required ],
      modelo: [ "", Validators.required ],
      funcionamiento: ["", Validators.required],
      al_electrica : ["", Validators.required],
      tamano_dial : ["", Validators.required],
      dimension_conexion : [ "", Validators.required ],
      conexion: [ "", Validators.required ],
      carcaza: [ "", Validators.required ],
      unidades_rango: ["", Validators.required],
      rango_min : [0, Validators.required],
      rango_max : [ 0, Validators.required ],
      p_funcionamiento: [ "", Validators.required ],
      tipo_elemento: [ "", Validators.required ],
      indicador_auxiliar: [ "", Validators.required ],
      req_especial: [ "", Validators.required ],
      ubicacionI: [ "", Validators.required ]

    });
    this.form2 = this.fb.group({
      subtipoFuncionEquipo:["", Validators.required],
      nomenclatura: ["", Validators.required],
      marca : ["", Validators.required],
      serial : [ "", Validators.required ],
      tag: [ "", Validators.required ],
      modelo: [ "", Validators.required ],
      al_electrica : ["", Validators.required],
      exactitud : [ "", Validators.required ],
      ele_medicion: [ "", Validators.required ],
      carcaza: [ "", Validators.required ],
      tipo_elemento: ["", Validators.required],
      rango_min : [0, Validators.required],
      rango_max : [ 0, Validators.required ],
      comunicacion: [ "", Validators.required ],
      m_diafragma: [ "", Validators.required ],
      m_cuerpo: [ "", Validators.required ],
      manifold: [ "", Validators.required ],
      f_manifold: [ "", Validators.required ],
      req_especial: [ "", Validators.required ],
      ubicacionT : [ "", Validators.required ]
    });
    this.form3 = this.fb.group({
      subtipoFuncionEquipo:["", Validators.required],//si
      marca : ["", Validators.required],//si
      serial : [ "", Validators.required ],//si
      tag: [ "", Validators.required ],//ai
      modelo: [ "", Validators.required ],//si
      al_electrica : ["", Validators.required],//si
      tipo_elemento: ["", Validators.required],
      tipo_conexion: ["", Validators.required],
      m_cuerpo: [ "", Validators.required ],
      req_especial: [ "", Validators.required ],
      ubicacionS: ["", Validators.required]
    });

  }
  //Crear Equipos
  createEquipoClienteSwitch(form3, equipoForm3){
    console.log("ya llegue aqui");
    const formModel = this.form3.value;
    let saveEquipo: EquipoModel ={
      tipo : this.tipoEquipo,
      subtipo : this.sub_tipo,
      subtipoFuncionEquipo : formModel.subtipoFuncionEquipo as string,//si
      marca: formModel.marca as string,//si
      serial: formModel.serial as string,//si
      tag: formModel.tag as string,//si
      modelo: formModel.modelo as string,//si
      alimentacion_electrica :formModel.al_electrica as string,
      tipo_elemento : formModel.tipo_elemento as string,
      tipo_conexion : formModel.tipo_conexion as string,
      material_cuerpo : formModel.m_cuerpo as string,
      req_especial : formModel.req_especial as string,
      ubicacion : formModel.ubicacionS as string,
      usuario_creador : this.identity._id,
      tercero : this.identity.tercero
    };
    console.log(saveEquipo);
     this._equipoServices.createEquipoCliente(saveEquipo)
        .subscribe((datos:any)=>{
          if(datos.message == "Equipo ya existe"){
            swal("No es Posible", "Equipo ya Existe", "warning");         
          }else if( datos.message == 'No completo los datos minimos requeridos'){
            swal("error", "No completo los datos minimos requeridos", "warning");
          }else{
            swal("Exito", "Equipo Creado", "success");
            form3.reset();
            this.form3 = this.fb.group({
              subtipoFuncionEquipo:["", Validators.required],
              marca : ["", Validators.required],
              serial : [ "", Validators.required ],
              tag: [ "", Validators.required ],
              modelo: [ "", Validators.required ],
              al_electrica : ["", Validators.required],
              tipo_elemento: ["", Validators.required],
              tipo_conexion: ["", Validators.required],
              m_cuerpo: [ "", Validators.required ],
              req_especial: [ "", Validators.required ],
              ubicacionS : [ "", Validators.required ],
            });
          }  
    }); 
  }
  //Crear Equipos
  createEquipoClienteIndicadores(form1, EquipoFormE){
    console.log("ya llegue aqui");
    const formModel = this.form1.value;
    let saveEquipo: EquipoModel ={
      tipo : this.tipoEquipo,
      subtipo : this.sub_tipo,
      subtipoFuncionEquipo : formModel.subtipoFuncionEquipo as string,
      nomenclatura: formModel.nomenclatura as string,
      marca: formModel.marca as string,
      serial: formModel.serial as string,
      tag: formModel.tag as string,
      modelo: formModel.modelo as string,
      funcionamiento: formModel.funcionamiento as string,
      alimentacion_electrica :formModel.al_electrica as string,
      tamano_dial: formModel.tamano_dial as string,
      dimension_conexion: formModel.dimension_conexion as string,
      tipo_conexion: formModel.conexion as string,
      material_carcaza: formModel.carcaza as string,
      unidades_rango: formModel.unidades_rango as string,
      rango_min: formModel.rango_min as number,
      rango_max: formModel.rango_max as number,
      p_funcionamiento: formModel.p_funcionamiento as string,
      tipo_elemento: formModel.tipo_elemento as string,
      indicador_auxiliar: formModel.indicador_auxiliar as string,
      req_especial: formModel.req_especial as string,
      ubicacion : formModel.ubicacionI as string,
      usuario_creador : this.identity._id,
      tercero : this.identity.tercero
    };
    console.log(saveEquipo);
    this._equipoServices.createEquipoCliente(saveEquipo)
        .subscribe((datos:any)=>{
          if(datos.message == "Equipo ya existe"){
            swal("No es Posible", "Equipo ya Existe", "warning");            
          }else if( datos.message == 'No completo los datos minimos requeridos'){
            swal("error", "No completo los datos minimos requeridos", "warning");
          }else{
            swal("Exito", "Equipo Creado", "success");
            this.form1 = this.fb.group({
              subtipoFuncionEquipo:["", Validators.required],
              nomenclatura: ["", Validators.required],
              marca : ["", Validators.required],
              serial : [ "", Validators.required ],
              tag: [ "", Validators.required ],
              modelo: [ "", Validators.required ],
              funcionamiento: ["", Validators.required],
              al_electrica : ["", Validators.required],
              tamano_dial : ["", Validators.required],
              dimension_conexion : [ "", Validators.required ],
              conexion: [ "", Validators.required ],
              carcaza: [ "", Validators.required ],
              unidades_rango: ["", Validators.required],
              rango_min : [0, Validators.required],
              rango_max : [ 0, Validators.required ],
              p_funcionamiento: [ "", Validators.required ],
              tipo_elemento: [ "", Validators.required ],
              indicador_auxiliar: [ "", Validators.required ],
              req_especial: [ "", Validators.required ],
              ubicacionI : ["", Validators.required]
            });
          }  
    });
  }
  //Crear Equipos
  createEquipoClienteTransmisores(form2, equipoForm2){
    console.log("ya llegue aqui");
    const formModel = this.form2.value;
    let saveEquipo: EquipoModel ={
      tipo : this.tipoEquipo,
      subtipo : this.sub_tipo,
      subtipoFuncionEquipo : formModel.subtipoFuncionEquipo as string,
      nomenclatura: formModel.nomenclatura as string,
      marca: formModel.marca as string,
      serial: formModel.serial as string,
      tag: formModel.tag as string,
      modelo: formModel.modelo as string,
      material_carcaza: formModel.carcaza as string,
      alimentacion_electrica :formModel.al_electrica as string,
      exactitud : formModel.exactitud as string,
      elemento_medicion : formModel.ele_medicion as string,
      tipo_elemento : formModel.tipo_elemento as string,
      rango_min: formModel.rango_min as number,
      rango_max: formModel.rango_max as number,
      comunicacion : formModel.comunicacion as string,
      material_diafragma : formModel.m_diafragma as string,
      material_cuerpo : formModel.m_cuerpo as string,
      tipo_manifold : formModel.manifold as string,
      fabricante_manifold : formModel.f_manifold as string,
      req_especial : formModel.req_especial as string,
      ubicacion : formModel.ubicacionT as string,
      usuario_creador : this.identity._id,
      tercero : this.identity.tercero
    };
    console.log(saveEquipo);
    this._equipoServices.createEquipoCliente(saveEquipo)
        .subscribe((datos:any)=>{
          if(datos.message == "Equipo ya existe"){
            swal("No es Posible", "Equipo ya Existe", "warning");

            
          }else if( datos.message == 'No completo los datos minimos requeridos'){
            swal("error", "No completo los datos minimos requeridos", "warning");
          }else{
            swal("Exito", "Equipo Creado", "success");
            form2.reset();
          }  
    });
  }

  //Captura de tipo de equipo
  capturaTipoPrincipal(event){
    this.tipoEquipo = event.path[0].value;  
  }
  //Captura de subtipo
  capturasubtipo(event){
    this.sub_tipo = event.path[0].value;
  }
  //Captura de tipo de equipo
  subtipoFuncionEquipo(event){
    this.tipodeltipo = event.path[0].value;
    console.log(this.tipodeltipo);
  }
  //Capturando el funcionamiento
  funcionEquipo(event){
    this.funcionamiento = event.path[0].value;
  }
  //Lista las ubicaciones del cliente
  listarUbicacionesCliente(){
    this._ubicacionService.listarUbicacionesClienteautocomplete()
        .subscribe((datos:any)=>{
          this.ubicaciones = datos.ubicaciones;      
        })
  }
 

}

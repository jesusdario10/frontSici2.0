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
  public identity : any;
  public equipo : EquipoModel;

  idEquipo
  tipoEquipo;
  sub_tipo;
  subtipoFuncionEquipo;
  nomenclatura;
  marca;
  serial;
  tag;
  modelo;
  funcionamiento;
  tamano_dial;
  dimension_conexion;
  conexion;
  carcaza;
  unidades_rango;
  rango_min;
  rango_max;
  p_funcionamiento;
  tipo_elemento;
  indicador_auxiliar;
  req_especial;
  //Transmisores
  alimentacion_electrica;
  exactitud;
  elemento_medicion;
  comunicacion;
  material_diafragma;
  material_cuerpo;
  tipo_manifold;
  fabricante_manifold;

 
  constructor(
    private _userServices : UserService,
    private _equipoServices : EquipoService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.listarUnsoloEquipoCliente();
    this.identity = this._userServices.getIdentity();


  }
  //Captura de tipo de equipo
  capturaTipoPrincipal(event){
    this.tipoEquipo = event.path[0].value;  
    this.equipo.tipo = this.tipoEquipo;
  }
  //Captura de subtipo
  capturasubtipo(event){
    this.sub_tipo = event.path[0].value;
    this.equipo.subtipo = this.sub_tipo;
  }
  subtipoFuncionEquipo1(event){
    this.subtipoFuncionEquipo = event.path[0].value;
    if(this.subtipoFuncionEquipo=='TEMPERATURA'){
      this.material_diafragma == '';
      this.req_especial == '';
    }
    this.equipo.subtipoFuncionEquipo = this.subtipoFuncionEquipo;
    console.log(this.subtipoFuncionEquipo);
  }
  //Listar un solo Equipo del cliente
  listarUnsoloEquipoCliente(){
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];
    this.idEquipo = id;
    this._equipoServices.listarUnSoloEquipoCliente(this.idEquipo)
        .subscribe((datos:any)=>{
          this.equipo = datos.equipo;
          console.log(this.equipo.alimentacion_electrica);
           
          this.tipoEquipo = this.equipo.tipo;
          this.sub_tipo = this.equipo.subtipo;
          this.subtipoFuncionEquipo = this.equipo.subtipoFuncionEquipo;
          this.nomenclatura = this.equipo.nomenclatura;
          this.marca = this.equipo.marca;
          this.serial = this.equipo.serial;
          this.tag = this.equipo.tag;
          this.modelo = this.equipo.modelo;
          this.funcionamiento = this.equipo.funcionamiento;
          this.tamano_dial = this.equipo.tamano_dial;
          this.dimension_conexion = this.equipo.dimension_conexion;
          this.conexion = this.equipo.tipo_conexion;
          this.carcaza = this.equipo.material_carcaza;
          this.unidades_rango = this.equipo.unidades_rango;
          this.rango_min = this.equipo.rango_min;
          this.rango_max = this.equipo.rango_max;
          this.p_funcionamiento = this.equipo.p_funcionamiento;
          this.tipo_elemento = this.equipo.tipo_elemento;
          this.indicador_auxiliar = this.equipo.indicador_auxiliar;
          this.req_especial = this.equipo.req_especial;
          //transmisores
          this.alimentacion_electrica = this.equipo.alimentacion_electrica;
          this.exactitud = this.equipo.exactitud;
          this.elemento_medicion = this.equipo.elemento_medicion;
          this.comunicacion = this.equipo.comunicacion;
          this.material_diafragma = this.equipo.material_diafragma;
          this.material_cuerpo = this.equipo.material_cuerpo;
          this.tipo_manifold = this.equipo.tipo_manifold;
          this.fabricante_manifold = this.equipo.fabricante_manifold;
          console.log(this.equipo);
        })        
  }
  //Editar Equipo
  editEquipoCliente(){
    
    let editEquipoCliente: EquipoModel ={
      tipo : this.tipoEquipo,
      subtipo : this.sub_tipo,
      subtipoFuncionEquipo : this.subtipoFuncionEquipo,
      nomenclatura: this.nomenclatura,
      marca: this.marca,
      serial: this.serial,
      tag: this.tag,
      modelo: this.modelo,
      funcionamiento: this.funcionamiento,
      tamano_dial: this.tamano_dial,
      dimension_conexion: this.dimension_conexion,
      tipo_conexion: this.conexion,
      material_carcaza: this.carcaza,
      unidades_rango: this.unidades_rango,
      rango_min: this.rango_min,
      rango_max: this.rango_max,
      p_funcionamiento: this.p_funcionamiento,
      tipo_elemento: this.tipo_elemento,
      indicador_auxiliar: this.indicador_auxiliar,
      req_especial: this.req_especial,
      alimentacion_electrica : this.alimentacion_electrica,
      exactitud : this.exactitud,
      elemento_medicion : this.elemento_medicion,
      comunicacion : this.comunicacion,
      material_diafragma : this.material_diafragma,
      material_cuerpo : this.material_cuerpo,
      tipo_manifold : this.tipo_manifold,
      usuario_creador : this.identity._id,
      tercero : this.identity.tercero
    };
    console.log(editEquipoCliente);

    this._equipoServices.UpdateEquiposCliente(editEquipoCliente, this.idEquipo)
        .subscribe((datos:any)=>{
          console.log(datos);
          swal('!Exito', "Se ha Editado su Equipo", "success");
          this.listarUnsoloEquipoCliente();
        })

  }
  //Capturando el funcionamiento
  funcionEquipo(event){
    this.funcionamiento = event.path[0].value;
  }   






}

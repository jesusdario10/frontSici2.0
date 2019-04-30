import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import * as moment from 'moment';
import { EquipoService } from 'src/app/services/equipo.service';



@Component({
  selector: 'app-historicopor-equipo',
  templateUrl: './historicopor-equipo.component.html',
  styleUrls: ['./historicopor-equipo.component.css']
})
export class HistoricoporEquipoComponent implements OnInit {
  tercero:string;
  equipo:string;
  serial: any;
  tag: any;
  subtipo: any;
  subtipoFuncionEquipo: any;
  ordenes : any[]=[];
  identity: any;
  fechaCreacion: any;
  fechaRequerida: any;
  fechaRestriccion: any;
  fechaRestriccionFormateada: any;
  ubicacion2: any;
  prioridad: any;
  nombreEquipo: any;
  libreria: any;
  solicitante: any;
  descripcionLabor: any;
  noOrden: any;
  recursos: any;
  vhora_hombre: any;
  estadouna: any;
  restriccion: any;
  aniosdif: any;
  mesesdif: any;
  diasdif: any;
  hoursdif: any;
  hora: any;
  

  constructor(
    private _ordenService : OrdenesService,
    private _equipoService : EquipoService

  ) {
    //extraer tercero y equipo
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    this.tercero = extraer[4];
    this.equipo = extraer[5];
    
   }

  ngOnInit() {
    this.listarUnsoloEquipo();
    this.listarActividadesporEquipos();
  }
  listarActividadesporEquipos(){
    this._ordenService.listarlasactividadesporClienteyequipo(this.tercero, this.equipo)
        .subscribe((data:any)=>{
          console.log(data);

          this.ordenes = data.actividades;
        })
  }
  listarUnaOrdenCliente(idOrden){
    this._ordenService.listarUnaOrdenParaelCliente(this.tercero, idOrden)
        .subscribe((datos:any)=>{
          console.log(datos);
          
          this.fechaCreacion  = datos.fechas.fecha_creacion;
          this.fechaRequerida  = datos.fechas.fecha_requerida;
          this.fechaRestriccion = datos.actividad.fecha_restriccion;
          this.fechaRestriccionFormateada = datos.fechas.fecha_restriccion;
          this.ubicacion2 = datos.actividad.ubicacion.nombre;
          this.prioridad = datos.actividad.prioridad;
          this.tag = datos.actividad.equipo.tag;
          this.nombreEquipo = datos.actividad.equipo.nombre_equipo;
          this.libreria = datos.actividad.libreria.nombre;
          this.solicitante = datos.actividad.solicitante;
          this.descripcionLabor = datos.actividad.descripcion;
          this.noOrden = datos.actividad.consecutivo;
          this.recursos = datos.actividad.recurso;
          this.vhora_hombre = datos.actividad.vhora_hombre;
          this.estadouna = datos.actividad.estado;
          this.restriccion = datos.actividad.restriccion;
          
          if(this.estadouna == 'DETENIDA'){
            var reloj = setInterval(()=>{
              let hoy =  moment();
                  
              let restriccion = new Date(this.fechaRestriccion);
              this.aniosdif  = hoy.diff(restriccion, "years");
              this.mesesdif = hoy.diff(restriccion, "months")
              this.diasdif = hoy.diff(restriccion, "days");
              this.hoursdif = hoy.diff(restriccion, "hours");
              let horaya = moment().format('LTS');
              this.hora = horaya;
            }, 1000)
          }
        })
  }
  listarUnsoloEquipo(){
    this._equipoService.listarUnSoloEquipoCliente(this.equipo)
        .subscribe((data:any)=>{
          this.serial = data.equipo.serial;
          this.tag = data.equipo.tag;
          this.subtipo = data.equipo.subtipo;
          this.subtipoFuncionEquipo = data.equipo.subtipoFuncionEquipo;
        })
  }

}


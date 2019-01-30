import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ActividadModel, Recurso } from 'src/app/models/actividadModel';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-avance-cliente-linea-ver',
  templateUrl: './avance-cliente-linea-ver.component.html',
  styleUrls: ['./avance-cliente-linea-ver.component.css']
})
export class AvanceClienteLineaVerComponent implements OnInit {
     //Orden
     orden : ActividadModel; 
     idOrden : string; 
     identity : any;
     recursos : any[]=[];
    
     //Datos de la orden
     fechaCreacion : string;
     fechaRequerida : string;
     fechaRestriccion : string;
     ubicacion : string;
     prioridad : string;
     tag : string;
     nombreEquipo : string;
     libreria : string;
     solicitante : string;
     descripcionLabor : string;
     noOrden: string;
     vhora_hombre: number;
     estado: string;
     restriccion: string;
     fechaRestriccionFormateada: any;

     //mostrar tiempo de restriccion
     aniosdif;
     mesesdif;
     diasdif;
     hoursdif;
     hora;

  constructor(
    private _ordenServices : OrdenesService,
    private _userServices : UserService
  ) { }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    //extraer id Orden
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];
    this.idOrden = id;
    //Traer datos de la orden
    this.listarUnaOrdenCliente();
  }
  //Traer los datos de una orden
  listarUnaOrdenCliente(){
    this._ordenServices.listarUnaOrdenParaelCliente(this.identity.tercero, this.idOrden)
        .subscribe((datos:any)=>{
         
          this.fechaCreacion  = datos.fechas.fecha_creacion;
          this.fechaRequerida  = datos.fechas.fecha_requerida;
          this.fechaRestriccion = datos.actividad.fecha_restriccion;
          this.fechaRestriccionFormateada = datos.fechas.fecha_restriccion;
          this.ubicacion = datos.actividad.ubicacion.nombre;
          this.prioridad = datos.actividad.prioridad;
          this.tag = datos.actividad.equipo.tag;
          this.nombreEquipo = datos.actividad.equipo.nombre_equipo;
          this.libreria = datos.actividad.libreria.nombre;
          this.solicitante = datos.actividad.solicitante;
          this.descripcionLabor = datos.actividad.descripcion;
          this.noOrden = datos.actividad.consecutivo;
          this.recursos = datos.actividad.recurso;
          this.vhora_hombre = datos.actividad.vhora_hombre;
          this.estado = datos.actividad.estado;
          this.restriccion = datos.actividad.restriccion;

          
          if(this.estado == 'DETENIDA'){


            
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

}

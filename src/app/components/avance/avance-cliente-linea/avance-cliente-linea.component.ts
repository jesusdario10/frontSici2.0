import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ActividadModel } from 'src/app/models/actividadModel';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { UbicacionService } from 'src/app/services/ubicacion.service';

import * as moment from 'moment';



declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-avance-cliente-linea',
  templateUrl: './avance-cliente-linea.component.html',
  styleUrls: ['./avance-cliente-linea.component.css']
})
export class AvanceClienteLineaComponent implements OnInit {
  ordenes : ActividadModel[]=[];
  identity: any;
  estado;
  estados  = "Semaforo";
  

//Estados de las ordenes
  activas: number;
  ejecucion:number;
  detenidas : number;
  ejecutadas:number;
  eliminadas:number;


  //Paginacion por estados
  page: number;
  next_page: number;
  pre_page: number;
  total: any;
  pages: any;
  quitarSiguiente:any;  

  //Formulario de fechas
  form : FormGroup;
  fecha_Final: string;
  fecha_Inicial: string;
  ubicacion2 : string;
  avanzado;

  fecha: string;


  //Arrays
  arrayFechas: any[]=[];
  arrayActivas: any[]=[];
  arrayDetenidas: any[]=[];
  arrayEjecucion: any[]=[];
  arrayEjecutadas: any[]=[];
  ubicaciones:any=[];



  sinfecha: number;
  confecha: number;

  
  fechaCreacion: any;
  fechaRequerida: any;
  fechaRestriccion: any;
  fechaRestriccionFormateada: any;
  prioridad: any;
  tag: any;
  nombreEquipo: any;
  libreria: any;
  solicitante: any;
  descripcionLabor: any;
  noOrden: any;
  recursos: any;
  vhora_hombre: any;
  estadouna: any;
  restriccion: any;
  aniosdif: number;
  mesesdif: number;
  diasdif: number;
  hoursdif: number;
  hora: string;


  constructor(
    private _OrdenesService : OrdenesService,
    private _UbicacionService : UbicacionService,
    private _UserService : UserService, 
    private _router : Router,
    private _route:ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.estado = "TODO";
    this.sinfecha = 1;
    this.confecha = 0;
    //this.ubicacion2 = 'TODO';
   }

  ngOnInit() {
    //Identidad del usuario
    this.identity = this._UserService.getIdentity();
    this.listarUbicacionesCliente();

    //inicializando  formulario de fechas
    this.form = this.fb.group({
      fechaInicial : [ "", Validators.required ],
      fechaFinal: [ "", Validators.required ],
      Ubicacion: [ "", Validators.required ]
    });
    //this.resultadosFechaSinPaginacion();
    this.actualPage();
    //this.resultadosFechaSinPaginacion();

  }
  //Actual Page
  actualPage(){
    //asi capturo paramtros de la url
    this._route.params.subscribe(params=>{
      let page = +params['page'];//con el + delante lo convierto en un entero
      this.page = page;
    
      if(!params['page']){
        page = 1;
      }
      if(!page){
        page = 1
      }else{
        this.next_page = page + 1;
        this.pre_page = page - 1;
    
        if(this.pre_page <= 0){
          this.pre_page = 1;
        }
      }
      if(page >= this.pages){
        page = this.pages
      }
      if(this.confecha == 1){
        this.resultadosFechaSinPaginacionporEstado();
        this.resultadosFechaLineaClientePaginado(this.estado, page);
      }
    })
   }
  //resultrado para el grafico lineal con paginacion
  resultadosFechaLineaClientePaginado(estado, page){
    
    const formModel = this.form.value;
    this.fecha_Inicial = formModel.fechaInicial as string;
    this.fecha_Final = formModel.fechaFinal as string;
    this.ubicacion2 =  formModel.Ubicacion as string;
    if(this.form.invalid){
      return;
    }
    if(page == 0){
      page = 1;
    }
    this._OrdenesService.listarporFechaLineaClienteSipaginado(this.identity.tercero, this.fecha_Inicial, this.fecha_Final, this.ubicacion2, estado, page )
        .subscribe((datos:any)=>{
          this.ordenes = datos.actividades;
          this.pages = datos.pages;
          this.total = datos.total;
        })
  }
  //resultados para el grafico lineal sin paginacion
   resultadosFechaSinPaginacionporEstado(){
    const formModel = this.form.value;
 
    this.ubicacion2 =  formModel.Ubicacion as string;
    let fecha_Inicial = formModel.fechaInicial as string;
    let fecha_Final = formModel.fechaFinal as string;
    if(this.form.invalid){
      return;
    }
    this._OrdenesService.listarporFechaLineaClienteNopaginado(this.identity.tercero, fecha_Inicial, fecha_Final, this.ubicacion2)
        .subscribe((datos:any)=>{
          this.arrayFechas = datos.arrayFechas;   
          this.arrayActivas = datos.arrayActivas;
          this.arrayDetenidas = datos.arrayDetenidas;
          this.arrayEjecucion = datos.arrayEjecucion;
          this.arrayEjecutadas = datos.arrayEjecutadas;
          this.activas = datos.activas2;
          this.ejecucion = datos.ejecucion2;
          this.ejecutadas = datos.ejecutadas2;
          this.detenidas = datos.detenidas2;
          this.graficoLinea(this.arrayFechas, this.arrayActivas, this.arrayDetenidas, this.arrayEjecucion, this.arrayEjecutadas);
        })
        
   }
   graficoLinea(arrayFechas, arrayActivas, arrayDetenidas, arrayEjecucion, arrayEjecutadas){
      //si existe el canvas quitalo
      $('#line-chart').remove();
      //crea un nuevo canvas
      $('#lineaContainer').append('<canvas id="line-chart"></canvas>');
      //crea la dona
      var lineGraf = document.getElementById('line-chart'); 
      let myLine = new Chart(lineGraf, {
        type: 'line',
        data: {
          labels: arrayFechas,
          datasets: [{ 
            data: arrayActivas,
            label: "Activas",
            borderColor: "#28a745",
            fill: false,
            lineTension: 0,
            pointHitRadius: 30,
            pointRadius: 5,
            //borderDash: [5, 5],
            pointStyle: 'rectRounded',
          }, { 
            data: arrayDetenidas,
            label: "Detenidas",
            borderColor: "#dc3545",
            fill: false,
            lineTension: 0,
            pointHitRadius: 30,
            pointRadius: 5,
            pointStyle: 'rectRounded',
          }, { 
            data: arrayEjecucion,
            label: "Ejecucion",
            borderColor: "#ffc107",
            fill: false,
            lineTension: 0,
            pointHitRadius: 30,
            pointRadius: 5,
            
            pointStyle: 'rectRounded',
          }, { 
            data: arrayEjecutadas,
            label: "Ejecutadas",
            borderColor: "#007bff",
            fill: false,
            lineTension: 0,
            pointHitRadius: 30,
            pointRadius: 5,
            
            pointStyle: 'rectRounded',
          },
          
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Diagrama de Avance en linea de tiempo'
        }
      }
    })
  }
  //Click por estados
  clickActivas(){
    this.sinfecha = 1;
    this.confecha = 1;
    this.estados = "Activas";
    this.estado = "ACTIVA";
    this._router.navigate(['graficoClienteLinea/1']);
    this.actualPage();
  }
  clickEjecucion(){
    this.sinfecha = 1;
    this.confecha = 1;
    this.estados = "Ejecucion"; 
    this.estado = "EJECUCION";
    this._router.navigate(['graficoClienteLinea/1']);
    this.actualPage();
  }
  clickEjecutadas(){
    this.sinfecha = 1;
    this.confecha = 1;
    this.estados = "Ejecutadas"; 
    this.estado = "EJECUTADA";
    this._router.navigate(['graficoClienteLinea/1']);
    this.actualPage();
  }
  clickDetenidas(){
    this.estados = "Detenida";
    this.estado = "DETENIDA";
    this._router.navigate(['graficoClienteLinea/1']);
    this.actualPage();
  }
  clickRestaurar(){
    this.estados = "Restaurar";
    this.estado = "TODO";
    this._router.navigate(['graficoClienteLinea/1']);
    this.actualPage();
  }
  conFecha(){
    this.confecha = 1;
    this._router.navigate(['graficoClienteLinea/1']);
    this.actualPage();
  }  
  //Lista las ubicaciones del cliente
  listarUbicacionesCliente(){
    this._UbicacionService.listarUbicacionesClienteautocomplete()
        .subscribe((datos:any)=>{
          this.ubicaciones = datos.ubicaciones;        
        })
  }
  sabervalor(){
   let ver = $('#avanzado').prop('indeterminate', false)
   this.avanzado = ver[0].checked
  }
    //Traer los datos de una orden
    listarUnaOrdenCliente(idOrden){
      this._OrdenesService.listarUnaOrdenParaelCliente(this.identity.tercero, idOrden)
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
      


}

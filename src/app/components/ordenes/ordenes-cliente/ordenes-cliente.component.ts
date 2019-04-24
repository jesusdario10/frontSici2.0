import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ActividadModel } from 'src/app/models/actividadModel';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import * as moment from 'moment';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-ordenes-cliente',
  templateUrl: './ordenes-cliente.component.html',
  styleUrls: ['./ordenes-cliente.component.css']
})
export class OrdenesClienteComponent implements OnInit {
  public estados = "Filtros:";
  public estado;
  public operaciones = "Operaciones";
  public ordenes : ActividadModel[]=[];
  public ordenes2 : ActividadModel[]=[];
  public excel:any[]=[];
  identity: any;

  //estados de las ordenes
  activas: number;
  ejecucion:number;
  detenidas : number;
  ejecutadas:number;
  eliminadas:number;

  //paginacion por estados
  page: number;
  next_page: number;
  pre_page: number;
  total: any;
  pages: any;
  quitarSiguiente:any;

  fechaCreacion: any;
  fechaRequerida: any;
  fechaRestriccion: any;
  fechaRestriccionFormateada: any;
  ubicacion2: any;
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
  aniosdif: any;
  mesesdif: any;
  diasdif: any;
  hoursdif: any;
  hora: any;

  constructor(
    private _OrdenesService : OrdenesService,
    private _UserService : UserService, 
    private _router : Router,
    private _route:ActivatedRoute,
    private excelService : ExportExcelService
  ) {
    this.estado =  "TODO";
   }

  ngOnInit() {
    this.identity = this._UserService.getIdentity();
    this.actualPage();   
  }
  //Efectos
  leave(e){
    this.estados = "Filtros:"
  }
  enteActivas(e){
    this.estados = "Activas";
  }
  enteEjecucion(e){
    this.estados = "Ejecucion"; 
  }

  enteEjecutadas(e){
    this.estados = "Ejecutadas"; 
  }
  enteRestriccion(e){
    this.estados = "Detenida";
  }
  enterExcel(e){
    this.operaciones = "Exportar";
  }
  leaveOperaciones(e){
    this.operaciones = "Operaciones";
  }
  enterRestore(e){
    this.operaciones = "Restaurar";
  }
  //Click
  clickActivas(){
    this.estado = "ACTIVA";
    this._router.navigate(['ordenesC/1']);
    this.actualPage();
  }
  clickEjecucion(){
    this.estado = "EJECUCION";
    this._router.navigate(['ordenesC/1']);
    this.actualPage();
  }
  clickEjecutadas(){
    this.estado = "EJECUTADA";
    this._router.navigate(['ordenesC/1']);
    this.actualPage();
  }
  clickDetenidas(){
    this.estado = "DETENIDA";
    this._router.navigate(['ordenesC/1']);
    this.actualPage();
  }
  clickTodo(){
    this.estado = "TODO";
    this._router.navigate(['ordenesC/1']);
    this.actualPage();
  }
  //Listar Ordenes para los clientes sin paginacion
  listarOrdenesClientesSinPaginado(){
    this._OrdenesService.listarOrdenesSinPaginacionClientes(this.identity.tercero)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.excel = datos.tablaresultado;
          this.ordenes2 = datos.actividades;
          this.activas = datos.activas;
          this.ejecucion = datos.ejecucion;
          this.detenidas = datos.detenidas;
          this.ejecutadas = datos.ejecutadas;
          this.eliminadas = datos.eliminadas;
        })
  }
  //Listar Ordenes para los clientres por su estado o por todos por su estado
  listarOrdenClienteEstado(estado, page){
    
    this._OrdenesService.listarOrdenClienteEstado(this.identity.tercero, estado, this.page)
        .subscribe((datos:any)=>{
          if(datos.estado=='TODO'){
            this.ordenes = datos.actividades;
            this.total = datos.total;
            this.pages = datos.pages;
            
            this.listarOrdenesClientesSinPaginado();
              
          }
          if(datos.estado == 'ACTIVA'){
            this.ordenes = datos.actividades;
            this.total = datos.total;
            this.pages = datos.pages;
            this.listarOrdenesClientesSinPaginado();
          }
          if(datos.estado == 'EJECUCION'){
            this.ordenes = datos.actividades;
            this.total = datos.total;
            this.pages = datos.pages;
            this.listarOrdenesClientesSinPaginado();
          }
          if(datos.estado == 'DETENIDA'){
            this.ordenes = datos.actividades;
            this.total = datos.total;
            this.pages = datos.pages;
            this.listarOrdenesClientesSinPaginado();
          }
          if(datos.estado == 'EJECUTADA'){
            this.ordenes = datos.actividades;
            this.total = datos.total;
            this.pages = datos.pages;
            this.listarOrdenesClientesSinPaginado();
          }
        })
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
      
      this.listarOrdenClienteEstado(this.estado, page) 
    })
  }
  //Exportar a excel  
  exportToExcel(event) {
      this.excelService.exportAsExcelFile(this.ordenes2, 'ordenes');
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.excel, 'ordenes');
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

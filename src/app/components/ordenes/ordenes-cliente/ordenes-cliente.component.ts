import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ActividadModel } from 'src/app/models/actividadModel';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordenes-cliente',
  templateUrl: './ordenes-cliente.component.html',
  styleUrls: ['./ordenes-cliente.component.css']
})
export class OrdenesClienteComponent implements OnInit {
  public estados = "Filtros:";
  public estado = "TODO";
  public operaciones = "Operaciones";
  public ordenes : ActividadModel[]=[];
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

  constructor(
    private _OrdenesService : OrdenesService,
    private _UserService : UserService, 
    private _router : Router,
    private _route:ActivatedRoute,
  ) {
    
   }

  ngOnInit() {
    this.identity = this._UserService.getIdentity();
    this.actualPage();
    this.listarOrdenesClientesSinPaginado();
  }
  leave(e){
    this.estados = "Filtros:"
  }
  enteActivas(e){
    this.estados = "Activas";
    this.estado = "ACTIVA";
  }
  enteEjecucion(e){
    this.estados = "Ejecucion";
    this.estado = "EJECUCION";
  }

  enteEjecutadas(e){
    this.estados = "Ejecutadas";
    this.estado = "EJECUTADA";
  }

  enteRestriccion(e){
    this.estados = "Detenida";
    this.estado = "DETENIDA";
  }
  enterExcel(e){
    this.operaciones = "Descargar";
  }
  leaveOperaciones(e){
    this.operaciones = "Operaciones";
  }
  enterRestore(e){
    this.operaciones = "Restaurar";
  }
  //Listar Ordenes para los clientes sin paginacion
  listarOrdenesClientesSinPaginado(){
    this._OrdenesService.listarOrdenesSinPaginacionClientes(this.identity.tercero)
        .subscribe((datos:any)=>{
          
          this.ordenes = datos.actividades;
          this.activas = datos.activas;
          this.ejecucion = datos.ejecucion;
          this.detenidas = datos.detenidas;
          this.ejecutadas = datos.ejecutadas;
          this.eliminadas = datos.eliminadas;
        })
  }
    //Listar Ordenes para los clientres por su estado o por todos por su estado
    listarOrdenClienteEstado(estado, page){
      console.log(estado);
      this._OrdenesService.listarOrdenClienteEstado(this.identity.tercero, estado, this.page)
          .subscribe((datos:any)=>{
            console.log(datos);
            this.ordenes = datos.actividades;
            this.total = datos.total;
            this.pages = datos.pages;  
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

}

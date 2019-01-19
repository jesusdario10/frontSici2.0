import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ActividadModel } from 'src/app/models/actividadModel';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-avance-cliente-dona',
  templateUrl: './avance-cliente-dona.component.html',
  styleUrls: ['./avance-cliente-dona.component.css']
})
export class AvanceClienteDonaComponent implements OnInit {
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


  constructor(
    private _OrdenesService : OrdenesService,
    private _UserService : UserService, 
    private _router : Router,
    private _route:ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.estado = "TODO"
   }

  ngOnInit() {
    //Identidad del usuario
    this.identity = this._UserService.getIdentity();
    this.listarOrdenesClientesSinPaginado();
    //inicializando  formulario de fechas
    this.form = this.fb.group({
      fechaInicial : [ "", Validators.required ],
      fechaFinal: [ "", Validators.required ]
    });
    //Pagina Actual
    this.actualPage();
  }
  //Listar Ordenes para los clientes sin paginacion
  listarOrdenesClientesSinPaginado(){
    this._OrdenesService.listarOrdenesSinPaginacionClientes(this.identity.tercero)
        .subscribe((datos:any)=>{
          this.activas = datos.activas;
          this.ejecucion = datos.ejecucion;
          this.detenidas = datos.detenidas;
          this.ejecutadas = datos.ejecutadas;
          this.eliminadas = datos.eliminadas;
    //grafico de dona
    var ctx = "myDona";
    var myDona = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Activas", "Detenidas", "Ejecucion", "Ejecutadas"],
            datasets: [{
                label: '# of Votes',
                data: [this.activas, this.detenidas, this.ejecucion, this.ejecutadas],
                backgroundColor: [
                    '#28a745',
                    '#dc3545',
                    '#ffc107',
                    '#007bff'
                ],

          
            }]
        },

    }); 
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
        console.log(this.estado);
        
  
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
    //Click por estados
    clickActivas(){
      this.estado = "ACTIVA";
      this._router.navigate(['graficoClienteDona/1']);
      this.actualPage();
    }
    clickEjecucion(){
      this.estado = "EJECUCION";
      this._router.navigate(['graficoClienteDona/1']);
      this.actualPage();
    }
    clickEjecutadas(){
      this.estado = "EJECUTADA";
      this._router.navigate(['graficoClienteDona/1']);
      this.actualPage();
    }
    clickDetenidas(){
      this.estado = "DETENIDA";
      this._router.navigate(['graficoClienteDona/1']);
      this.actualPage();
    }
    clickTodo(){
      this.estado = "TODO";
      this._router.navigate(['graficoClienteDona/1']);
      this.actualPage();
    }
     //Efectos

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
  leave(e){
    this.estados = "Semaforo"
  }
  //Listar resultados por fecha sin paginacion
  resultadosFechaSinPaginacion(){
    const formModel = this.form.value;

    let fecha_Inicial = formModel.fechaInicial as string;
    let fecha_Final = formModel.fechaFinal as string;

    

  }

      

}

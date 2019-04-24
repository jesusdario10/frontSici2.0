import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { EquipoModel } from 'src/app/models/equipoModel';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css']
})
export class BusquedasComponent implements OnInit {
  simple;
  avanzada;
  public identity : any;
  public equipos : EquipoModel[]=[];

  page: number;
  next_page: number;
  pre_page: number;
  total: any;
  pages: any;

  constructor(
    private _userServices : UserService,
    private _equipoServices : EquipoService,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { 
    this.simple =   'activada';
    this.avanzada = 'desactivada';
  }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    this.actualPage();
    
  }
  activarSimple(){
    this.simple ='activada';
    this.avanzada = 'desactivada';
  }
  activarAvanzada(){
    this.avanzada = 'activada';
    this.simple ='desactivada';
  }
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
      //ejecutar traer todos los usuarios
      this.listarEquiposCliente(page)
    })
  }
  //Listar Equipos de los clientes
  listarEquiposCliente(page){
    this._equipoServices.listarEquiposClientes(page)
      .subscribe((datos:any)=>{
        console.log(datos);
        this.equipos = datos.equipos;
        this.total = datos.total;
        this.pages = datos.pages;
        
      })
  }
  //Buscar Equipos dede el campo input dinamicamente
  buscarEquipos(termino:string){
    if(termino.length<=0){
      this.listarEquiposCliente(this.page)
      return;
    }
    this._equipoServices.buscarEquiposInputDinamico(termino)
        .subscribe((datos:any)=>{
          this.equipos = datos.equipos;
    })
  }
  //Buscar Equipos dede el campo input dinamicamente
  buscarEquiposporTag(termino:string){
    if(termino.length<=0){
      this.listarEquiposCliente(this.page)
      return;
    }
    this._equipoServices.buscarEquiposInputDinamicoporTag(termino)
        .subscribe((datos:any)=>{
          this.equipos = datos.equipos;
    })
  }
   

}

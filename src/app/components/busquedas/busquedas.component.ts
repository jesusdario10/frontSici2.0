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

  longitudTerminoTag:any;
  terminoTag:any;
  longitudTerminoSerial: any;
  terminoSerial: string;

  tercero: any;

 

  constructor(
    private _userServices : UserService,
    private _equipoServices : EquipoService,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { 
    this.pages = 1;
    this.simple =   'activada';
    this.avanzada = 'desactivada';
    this.longitudTerminoTag = 0;
    this.longitudTerminoSerial = 0;
    this.identity = this._userServices.getIdentity();
    this.tercero = this.identity.tercero;
    }

  ngOnInit() {
<<<<<<< HEAD
=======
    console.log(this.tercero);
>>>>>>> 5f9dee0937e57cf277663db412909c37a175ab7d
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
      console.log("este es page:", this.page);
      console.log("este es pages:", this.pages);
        
      if(this.longitudTerminoTag > 0){
        this._equipoServices.buscarEquiposInputDinamicoporTag(this.terminoTag, page)
          .subscribe((datos:any)=>{
            this.equipos = datos.equipos;
            this.total = datos.total;
            this.pages = datos.pages;
          })
      }else if(this.longitudTerminoSerial > 0 ){
        this._equipoServices.buscarEquiposInputDinamico(this.terminoSerial, page)
        .subscribe((datos:any)=>{
            console.log(datos);
            this.equipos = datos.equipos;
            this.total = datos.total;
            this.pages = datos.pages;
        });
      } else{
        this.listarEquiposCliente(page)
      }
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
    this.pages = 1;
    this._router.navigate(['/busquedas/1']);
    this.longitudTerminoTag = 0;
    this.longitudTerminoSerial = termino.length;
    this.terminoSerial = termino;

    if(termino.length<=0){
      this.longitudTerminoSerial = 0;
      this.listarEquiposCliente(this.page)
      return;
    }else{
      this._equipoServices.buscarEquiposInputDinamico(termino, 1)
        .subscribe((datos:any)=>{
            console.log(datos);
            this.equipos = datos.equipos;
            this.total = datos.total;
            this.pages = datos.pages;
        });
    }

  }
  //Buscar Equipos dede el campo input dinamicamente
  buscarEquiposporTag(termino:any){
    this.pages = 1;
    this._router.navigate(['/busquedas/1']);
    this.longitudTerminoSerial = 0;
    this.longitudTerminoTag = termino.length;
    this.terminoTag = termino;

    if(termino.length<=0){
      this.longitudTerminoTag = 0;
      this.listarEquiposCliente(this.page)
      return;
    }
    this._equipoServices.buscarEquiposInputDinamicoporTag(termino, 1)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.equipos = datos.equipos;
          this.total = datos.total;
          this.pages = datos.pages;
    })
  }
   

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CcostosService } from 'src/app/services/ccostos.service';
import { CcostoModel } from 'src/app/models/ccostoModel';
declare var swal:any;

@Component({
  selector: 'app-ccostos',
  templateUrl: './ccostos.component.html',
  styleUrls: ['./ccostos.component.css']
})
export class CcostosComponent implements OnInit {
  identity: any;
  public form : FormGroup;
  public formSubmit: boolean;
  page: number;
  next_page: number;
  pre_page: number;
  total: any;
  pages: any;
  ccostos : any[]=[];

  constructor(
    private _userServices : UserService,
    private _ccostoService: CcostosService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
        //inicializando el formulario
        this.form = this.fb.group({
          codigo :[ "", Validators.required ],
          responsable : [ "", Validators.required ],
          descripcion : [ "", Validators.required ]
        });
    //listarUbicaciones y saber cual es la pagina actual
    this.actualPage();
  }
  //Function para saber la pagina actual
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
      //ejecutar traer todas las ubicacionesCliente
      this.listarCentroCPage(page)
      console.log(page);
    })
  }
  //Listar Centros de costos de los clientes
  listarCentroCPage(page){
    this._ccostoService.listarCcostoPageCliente(page)
      .subscribe((datos:any)=>{
        console.log(datos);
        this.ccostos = datos.ccostos;
        this.total = datos.total;
        this.pages = datos.pages;
        console.log(this.pages);
      })
  }
  //Buscar Centros de costo desde el campo input dinamicamente
  buscarCcostosCliente(termino:string){
    console.log(termino);

    if(termino.length<=0){
      this.listarCentroCPage(this.page)
      return;
    }else{
      this._ccostoService.buscarCcostosInputDinamico(termino)
      .subscribe((datos:any)=>{
        console.log(datos);
        this.ccostos = datos.ccostos;
        this.total = datos.total;
        this.pages = datos.pages;
        
      })
    }
  }
  //Function para crear ubicacion cliente
  createCcostosCliente(form, ubicacionFormC){
  const formModel = this.form.value;
  let saveCcosto: CcostoModel ={
    codigo : formModel.codigo as string,
    responsable : formModel.responsable as string,
    descripcion : formModel.descripcion as string,
    tercero : this.identity.tercero,
  };
  this._ccostoService.createCcostoCliente(saveCcosto)
      .subscribe((datos:any)=>{
        console.log(datos);
        form.reset();
        swal("Exito", "Centro de Costo Creado Exitosamente", "success");    
        this.listarCentroCPage(this.page); 
      })
}



}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TerceroService } from 'src/app/services/tercero.service';
import { ConsecutivoModel } from 'src/app/models/consecutivoModel';
import { TerceroModel } from 'src/app/models/terceroModel';
import { ConsecutivoService } from 'src/app/services/consecutivo.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-consecutivos',
  templateUrl: './consecutivos.component.html',
  styleUrls: ['./consecutivos.component.css']
})
export class ConsecutivosComponent implements OnInit {
  public consecutivos: ConsecutivoModel[]=[];
  public terceros : TerceroModel[]=[];
  public identity:any;

  public form : FormGroup;
  public formSubmit: boolean;

  page: number;
  next_page: number;
  pre_page: number;
  total: any;
  pages: any;


  constructor(
    private _userServices : UserService,
    private _consecutivoService : ConsecutivoService,
    private _terceroServices : TerceroService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { 
    
  }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
      //inicializando el formulario
      this.form = this.fb.group({
        prefijoC : ["", Validators.required ],
        terceroC: ["", Validators.required ]
      });
    this.listarTerceros();
    this.listarConsecutivo(this.page);
    this.actualPage();
  }
  //Listar Terceros
  listarTerceros(){
    this._terceroServices.listarTercerossinPaginado()
        .subscribe((datos:any)=>{
          this.terceros = datos.terceros;
          console.log(this.terceros);
        })
  }
  //Crear Consecutivos
  createConsecutivo(form, consecutivoFormC){
    const formModel = this.form.value;

    let saveConsecutivo: ConsecutivoModel ={
      prefijo : formModel.prefijoC as string,
      tercero :formModel.terceroC as string
    };
    this._consecutivoService.crearConsecutivo(saveConsecutivo)
    .subscribe((datos:any)=>{
      console.log(datos);
      this.listarConsecutivo(this.page);
      if(!datos.consecutivo){
        swal('Error!!', 'Ya Tiene Asignado un Consecutivo', 'error');
      }else{
        swal('Exito!!', 'Consecutivo Creado Correctamente', 'success');
      }
      
      form.reset();
    })
  }
  //Captura y valida la pagina actual del paginado
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
      this.listarConsecutivo(page)
    })
  }
  //Listar Consecutivo
  listarConsecutivo(page){
    this._consecutivoService.listarConsecutivos(page)
      .subscribe((datos:any)=>{
        this.consecutivos = datos.consecutivos;
        this.total = datos.total;
        this.pages = datos.pages;
      })
  }
  //Buscar Consecutivos desde el campo input dinamicamente por nombre de cliente
  buscarInputDinamic(termino:string){
    console.log(termino.length);
    if(termino.length<=0){
      this.listarConsecutivo(this.page)
      return;
    }
    this._consecutivoService.buscarInputDinamico(termino)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.consecutivos = datos.consecutivos;
        })
  }

}

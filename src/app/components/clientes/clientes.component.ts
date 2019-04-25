import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TerceroModel } from 'src/app/models/terceroModel';
import { TerceroService } from 'src/app/services/tercero.service';
declare var swal:any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public terceros :TerceroModel[]=[];
  public newTercero: TerceroModel;

  public estado;

  public identity : any;

  public form : FormGroup;
  public formSubmit: boolean;
  page: number;
  next_page: number;
  pre_page: number;
  total: any;
  pages: any;

  constructor(
    private _userServices : UserService,
    private _terceroServices : TerceroService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { 
    this.page = 1;
  }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();

    //inicializando el formulario
    this.form = this.fb.group({
      nitT : ["", Validators.required ],
      nombreT: ["", Validators.required ],
      tipoT: ["", Validators.required ],
      direccionT: ["", Validators.required ],
      telefonoT: ["", Validators.required ],
      contactoT: ["", Validators.required ],
      descripcionT: ["", Validators.required ]
    });
    this.actualPage();
    this.listarTerceros(1); 
  }
  //Crear Terceros
  crearTerceros(form, terceroFormT){
    const formModel = this.form.value;

    let saveTercero: TerceroModel ={
      nit : formModel.nitT as string,
      nombre :formModel.nombreT as string,
      tipo_tercero :formModel.tipoT as string,
      telefono :formModel.telefonoT as string,
      direccion :formModel.direccionT as string,
      contacto :formModel.contactoT as string,
      descripcion :formModel.descripcionT as string
    };
    this._terceroServices.crearTercero(saveTercero)
        .subscribe((datos:any)=>{
          console.log(datos);
          swal('Exito!!', 'Tercero Creado Correctamente', 'success');
          this.listarTerceros(this.page);
          form.reset();
        })
  }
  //Listar Terceros
  listarTerceros(page){
    this._terceroServices.listarTerceros(page)
        .subscribe((datos:any)=>{
          this.terceros = datos.terceros;
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
      this.listarTerceros(this.page)
      
    })
  }
  //Buscar Tercero desde el campo input dinamicamente
  buscarTercero(termino:string){
    if(termino.length<=0){
      this.listarTerceros(this.page)
      return;
    }
    this._terceroServices.buscarTerceroaInputDinamico(termino)
        .subscribe((datos:any)=>{
          this.terceros = datos.terceros;
          console.log(datos);

        })
  }

}

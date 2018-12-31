import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LibreriaModel } from 'src/app/models/libreriaModel';
import { LibreriaService } from 'src/app/services/libreria.service';
declare var swal:any;


@Component({
  selector: 'app-libreria-cliente',
  templateUrl: './libreria-cliente.component.html',
  styleUrls: ['./libreria-cliente.component.css']
})
export class LibreriaClienteComponent implements OnInit {

    public librerias : LibreriaModel[]=[];
    public identity : any;
    public newLibreria : LibreriaModel;
    public form : FormGroup;
    public formSubmit: boolean;
    page: number;
    next_page: number;
    pre_page: number;
    total: any;
    pages: any;

  constructor(
    private _userServices : UserService,
    private _libreriaServices : LibreriaService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) {
    this.page = 1;
   }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    this.listLibreriasCliente(1);
    this.actualPage();
    //inicializando el formulario
    this.form = this.fb.group({
      nombreL : ["", Validators.required ],
      descripcionL: ["", Validators.required ]
    });
  }
  createLibreria(form, libreriaFormC){
    const formModel = this.form.value;
    let saveLibreria: LibreriaModel ={
      nombre : formModel.nombreL as string,
      descripcion :formModel.descripcionL as string,
      tercero : this.identity.tercero
    };
    this._libreriaServices.createLibreriaCliente(saveLibreria)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.listLibreriasCliente(1);
          swal('Exito!!', 'Libreria Creada Correctamente', 'success');
          form.reset();
          
        })
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
      this.listLibreriasCliente(page)
    })
  }
  listLibreriasCliente(page){
    this._libreriaServices.listLibreriasCliente(page)
        .subscribe((datos:any)=>{
          this.librerias = datos.librerias;
          console.log(datos);
        })
  }
  //Buscar Libreria desde el campo input dinamicamente
  buscarLibrerias(termino:string){
    if(termino.length<=0){
      this.listLibreriasCliente(this.page)
      return;
    }
    this._libreriaServices.buscarLibreriasInputDinamico(termino)
        .subscribe((datos:any)=>{
          this.librerias = datos.librerias;
        })
  }

}

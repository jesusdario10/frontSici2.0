import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CargoModel } from 'src/app/models/cargoModel';
import { CargoService } from 'src/app/services/cargo.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal:any;

@Component({
  selector: 'app-cargos-cliente',
  templateUrl: './cargos-cliente.component.html',
  styleUrls: ['./cargos-cliente.component.css']
})
export class CargosClienteComponent implements OnInit {
  public identity : any;
  public cargos : CargoModel[]=[];
  public newCargo : CargoModel;
  public form : FormGroup;
  public formSubmit: boolean;
  page: number;
  next_page: number;
  pre_page: number;
  total: any;
  pages: any;
  tipo:string;



  constructor(
    private _userServices : UserService,
    private _cargoServices : CargoService,
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
      nombreC : [ "", Validators.required ],
      tipo: [ "", Validators.required ],
      rendimiento: [ 0, Validators.required ],
      salario_dia: [ 0, Validators.required ]
    });
    //listarCargos
    this.actualPage();
    this.listarCargoCliente(1);
  }
  //Crear Cargos
  createCargo(form, createCargo){
    const formModel = this.form.value;
    let saveCargo: CargoModel ={
      nombre : formModel.nombreC as string,
      tipo :formModel.tipo as string,
      rendimiento : formModel.rendimiento as number,
      salario_dia : formModel.salario_dia as number,
      tercero : this.identity.tercero,
    };
    console.log(saveCargo);
     this._cargoServices.crearCargoCliente(saveCargo)
        .subscribe((datos:any)=>{
          console.log(datos);
          form.reset();
          swal("Exito", "Cargo Creado", "success");
          this.listarCargoCliente(this.page);
    }); 
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
      this.listarCargoCliente(page)
    })
  }
  //Listar Cargos de los clientes
  listarCargoCliente(page){

    this._cargoServices.listarCargosClientes(page)
      .subscribe((datos:any)=>{
        console.log(datos);
        this.cargos = datos.cargos;
        this.total = datos.total;
        this.pages = datos.pages;

      })
  }
  //Buscar Cargo desde el campo input dinamicamente
  buscarCargo(termino:string){
    if(termino.length<=0){
      this.listarCargoCliente(this.page)
      return;
    }
    this._cargoServices.buscarCargosInputDinamico(termino)
        .subscribe((datos:any)=>{
          this.cargos = datos.cargos;
        })
  }
 
  capturaTipo(event){
    this.tipo = event.path[0].value;  
    console.log(this.tipo);
  }

}

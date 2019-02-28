import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipoModel } from 'src/app/models/equipoModel';
import { EquipoService } from 'src/app/services/equipo.service';
declare var swal:any;

@Component({
  selector: 'app-equipo-cliente',
  templateUrl: './equipo-cliente.component.html',
  styleUrls: ['./equipo-cliente.component.css']
})
export class EquipoClienteComponent implements OnInit {
  public identity : any;
  public equipos : EquipoModel[]=[];
  public newEquipo : EquipoModel;
  public form : FormGroup;
  public formSubmit: boolean;
  page: number;
  next_page: number;
  pre_page: number;
  total: any;
  pages: any;

  constructor(
    private _userServices : UserService,
    private _equipoServices : EquipoService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    //inicializando el formulario
    this.form = this.fb.group({
      serialE : ["", Validators.required],
      tagE : [ "", Validators.required ],
      nombreE: [ "", Validators.required ],
      fichaT: [ "", Validators.required ]
    });
    //listarEquipos
    this.actualPage();
    this.listarEquiposCliente(1);
  }
  //Crear Equipos
  createEquipoCliente(form, EquipoFormE){
    console.log("ya llegue aqui");
    const formModel = this.form.value;
    let saveEquipo: EquipoModel ={
      serial : formModel.serialE as string,
      tag : formModel.tagE as string,
      nombre_equipo :formModel.nombreE as string,
      usuario_creador : this.identity._id,
      tercero : this.identity.tercero,
      fichaTecnica : formModel.fichaT
    };
    this._equipoServices.createEquipoCliente(saveEquipo)
        .subscribe((datos:any)=>{
          form.reset();
          if(datos.message == "Equipo ya existe"){
            swal("No es Posible", "Equipo ya Existe", "warning");
          }else{
            swal("Exito", "Equipo Creado", "success");
            this.listarEquiposCliente(this.page);
          }

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
      this.listarEquiposCliente(page)
    })
  }
  //Listar Equipos de los clientes
  listarEquiposCliente(page){
    this._equipoServices.listarEquiposClientes(page)
      .subscribe((datos:any)=>{
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

}

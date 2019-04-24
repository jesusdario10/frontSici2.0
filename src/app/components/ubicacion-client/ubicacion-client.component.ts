import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UbicacionModel } from 'src/app/models/ubicacionModel';
import { UbicacionService } from 'src/app/services/ubicacion.service';
declare var swal:any;

@Component({
  selector: 'app-ubicacion-client',
  templateUrl: './ubicacion-client.component.html',
  styleUrls: ['./ubicacion-client.component.css']
})
export class UbicacionClientComponent implements OnInit {
  public identity : any;
  public ubicaciones : UbicacionModel[]=[];
  public newUbicacion : UbicacionModel;
  public form : FormGroup;
  public formSubmit: boolean;
  page: number;
  next_page: number;
  pre_page: number;
  total: any;
  pages: any;

  constructor(
    private _userServices : UserService,
    private _ubicacionServices : UbicacionService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    //inicializando el formulario
    this.form = this.fb.group({
      codigo :[ "", Validators.required ],
      nombreC : [ "", Validators.required ]
    });
    //listarUbicaciones y saber cual es la pagina actual
    this.actualPage();
    this.listarUbicacionesCliente(1);
  }
  //Function para crear ubicacion cliente
  createUbicacionCliente(form, ubicacionFormC){
    const formModel = this.form.value;
    let saveUbicacion: UbicacionModel ={
      codigo : formModel.codigo as string,
      nombre : formModel.nombreC as string,
      tercero : this.identity.tercero,
    };
    this._ubicacionServices.createUbicacionCliente(saveUbicacion)
        .subscribe((datos:any)=>{
          console.log(datos);
          form.reset();
          swal("Exito", "Ubicacion Creada", "success");    
          this.listarUbicacionesCliente(this.page); 
        })
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
      this.listarUbicacionesCliente(page)
    })
  }
  //Listar Cargos de los clientes
  listarUbicacionesCliente(page){
    this._ubicacionServices.listarUbicacionesCliente(page)
      .subscribe((datos:any)=>{
        console.log(datos);
        this.ubicaciones = datos.ubicaciones;
        this.total = datos.total;
        this.pages = datos.pages;
      })
  }
 //Buscar Ubicacion desde el campo input dinamicamente
  buscarUbicacionCliente(termino:string){
    if(termino.length<=0){
      this.listarUbicacionesCliente(this.page)
      return;
    }
    this._ubicacionServices.buscarUbicacionesInputDinamico(termino)
        .subscribe((datos:any)=>{
          this.ubicaciones = datos.ubicaciones;
          
        })
  }
  
}

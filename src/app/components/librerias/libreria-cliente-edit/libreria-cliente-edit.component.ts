import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LibreriaService } from 'src/app/services/libreria.service';
import { UserService } from 'src/app/services/user.service';
import { LibreriaModel } from 'src/app/models/libreriaModel';

declare var swal:any;

@Component({
  selector: 'app-libreria-cliente-edit',
  templateUrl: './libreria-cliente-edit.component.html',
  styleUrls: ['./libreria-cliente-edit.component.css']
})
export class LibreriaClienteEditComponent implements OnInit {
  public identity : any;
  public ediLibreria : LibreriaModel;
  public nombreLibreria : string;
  public descripcionLibreria : string;
  public estado :string;
  public form : FormGroup;
  public formSubmit: boolean;

  constructor(
    private _userServices : UserService,
    private _libreriaServices : LibreriaService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    //inicializando el formulario
    this.form = this.fb.group({
      nombreL : ["", Validators.required ],
      descripcionL: ["", Validators.required ],
      estadoL :["", Validators.required]
    });
    this.buscarUnaLibreriaCliente();

    
  }
  //Buscar un solo cargo para guardarlo en una variable y editarlo despues
  buscarUnaLibreriaCliente(){
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];
    let libreria:LibreriaModel={
      _id :id,
      tercero : this.identity.tercero
    }
    this._libreriaServices.listarUnaLibreriaCliente(libreria)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.ediLibreria = datos;
          this.nombreLibreria = datos.nombre;
          this.descripcionLibreria = datos.descripcion;
          this.estado = datos.estado;
        })
  }
  //Editar Libreria
  editLibreria(form, libreriaFormE){
    const formModel = this.form.value;
    let editLibreria: LibreriaModel ={
      _id: this.ediLibreria._id,
      tercero : this.identity.tercero,
      nombre : this.nombreLibreria,
      descripcion :this.descripcionLibreria,
      estado : this.estado
    };
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];

    this._libreriaServices.editarLibreriaCliente(editLibreria)
        .subscribe((datos:any)=>{
          console.log(datos);
          swal("Exito", "Libreria Editada", "success");    
          this._router.navigate(['libreriasCliente/1'])
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UbicacionModel } from 'src/app/models/ubicacionModel';
import { UbicacionService } from 'src/app/services/ubicacion.service';
declare var swal:any;

@Component({
  selector: 'app-ubicacion-client-edit',
  templateUrl: './ubicacion-client-edit.component.html',
  styleUrls: ['./ubicacion-client-edit.component.css']
})
export class UbicacionClientEditComponent implements OnInit {
  public identity : any;
  public ediubicacion : UbicacionModel;
  public nombreCUbicacion : string;
  public estado :string;
  public form : FormGroup;
  public formSubmit: boolean;

  constructor(
    private _userServices : UserService,
    private _ubicacionService : UbicacionService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    //inicializando el formulario
    this.form = this.fb.group({
      nombreCUbicacion : [ "", Validators.required ],
      estadoC :["", Validators.required]
    });
    //buscando el cargo para editar
    this.buscarUbicacion();
  }
  //Editar Ubicacion Cliente
  editarUbicacion(form, ubicacionFormE){
    const formModel = this.form.value;
    let editUbicacion: UbicacionModel ={
      nombre : this.nombreCUbicacion,
      estado : this.estado
    };
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];

    this._ubicacionService.editarUbicacionCliente(editUbicacion, id)
        .subscribe((datos:any)=>{
          console.log(datos);
          form.reset();
          swal("Exito", "Ubicacion Editada", "success");    
          this._router.navigate(['ubicacion/1'])
    });
  }
  //Buscar un solo cargo para guardarlo en una variable y editarlo despues
  buscarUbicacion(){
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];
  
    this._ubicacionService.buscarUnaUbicacionCliente(id)
        .subscribe((datos:any)=>{
          this.ediubicacion = datos.ubicacion;
          this.nombreCUbicacion = datos.ubicacion.nombre;
          this.estado = datos.ubicacion.estado;

        })
  }


}

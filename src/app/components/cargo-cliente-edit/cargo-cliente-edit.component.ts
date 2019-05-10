import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CargoModel, CargoEdit } from 'src/app/models/cargoModel';
import { CargoService } from 'src/app/services/cargo.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal:any;

@Component({
  selector: 'app-cargo-cliente-edit',
  templateUrl: './cargo-cliente-edit.component.html',
  styleUrls: ['./cargo-cliente-edit.component.css']
})
export class CargoClienteEditComponent implements OnInit {
  public identity : any;
  public ediCargo : CargoModel;
  public nombre : string;
  public tipo : string;
  public rendimiento : number;
  public salario_dia : number 
  public estado :string;
  public form : FormGroup;
  public formSubmit: boolean;

  

  constructor(
    private _userServices : UserService,
    private _cargoServices : CargoService,
    private fb: FormBuilder,
    private _router : Router,
    private _route:ActivatedRoute,
  ) { 
  }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    //inicializando el formulario
    this.form = this.fb.group({
      nombre : [ "", Validators.required ],
      tipo: [ "", Validators.required ],
      rendimiento :[0, Validators.required],
      salario_dia : [0, Validators.required],
      estado : [ "", Validators.required ]

    });
    //buscando el cargo para editar
    this.buscarCargo();
    
  }
  //Editar Cargos
  editCargo(form, cargoFormE){
    const formModel = this.form.value;
    let editCargo: CargoModel ={
      nombre : formModel.nombre as string,
      tipo : formModel.tipo as string,
      rendimiento : formModel.rendimiento as number,
      salario_dia : formModel.salario_dia  as number,
      estado : formModel.estado as string,
      tercero : this.identity.tercero
    };
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];
    console.log(editCargo);

    this._cargoServices.updateCargoCliente(editCargo, id)
        .subscribe((datos:any)=>{
          swal("Exito", "Cargo Editado", "success");    
    }); 
  }
  //Buscar un solo cargo para guardarlo en una variable y editarlo despues
  buscarCargo(){
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];

    this._cargoServices.buscarUnCargoCliente(id, this.identity.tercero)
        .subscribe((datos:any)=>{
          this.ediCargo = datos.cargo;
          this.nombre = datos.cargo.nombre;
          this.tipo = datos.cargo.tipo;
          this.rendimiento = datos.cargo.rendimiento;
          this.salario_dia = datos.cargo.salario_dia;
          this.estado = datos.cargo.estado;
        })
  }
  capturaTipo(event){
    this.tipo = event.path[0].value;  
    
  }

}

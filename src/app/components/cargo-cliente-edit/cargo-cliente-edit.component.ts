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
      nombre : this.nombreCargo,
      vhora_hombre :this.valorHHombre,
      estado : this.estado
    };
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];

    this._cargoServices.editarCargoCliente(editCargo, id)
        .subscribe((datos:any)=>{
          console.log(datos);
          form.reset();
          swal("Exito", "Cargo Editado", "success");    
          this._router.navigate(['cargos/1'])
    });
  }
  //Buscar un solo cargo para guardarlo en una variable y editarlo despues
  buscarCargo(){
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[4];

    this._cargoServices.buscarUnCargoCliente(id, this.identity.tercero)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.ediCargo = datos.cargo;
          console.log(this.ediCargo);
          this.nombre = datos.cargo.nombre;
          this.tipo = datos.cargo.tipo;
          this.rendimiento = datos.cargo.rendimiento;
          this.salario_dia = datos.cargo.salario_dia;
          this.estado = datos.cargo.estado;
        })
  }

}

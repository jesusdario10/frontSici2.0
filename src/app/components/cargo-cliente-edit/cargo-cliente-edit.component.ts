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
  public cargos : CargoModel[]=[];
  public ediCargo : CargoModel;
  public nombreCargo : string;
  public valorHHombre : number;
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
      nombreC : [ "", Validators.required ],
      vhora_hombreC: [ 0, Validators.required ],
      estadoC :["", Validators.required]
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

    this._cargoServices.buscarUnCargoCliente(id)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.ediCargo = datos.cargo;
          console.log(this.ediCargo);
          this.nombreCargo = datos.cargo.nombre;
          this.valorHHombre = datos.cargo.vhora_hombre;
          this.estado = datos.cargo.estado;
        })
  }

}

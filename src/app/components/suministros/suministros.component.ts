import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { SuministroService } from 'src/app/services/suministro.service';
import { SuministroModel } from 'src/app/models/suministroModel';
declare var swal:any;

@Component({
  selector: 'app-suministros',
  templateUrl: './suministros.component.html',
  styleUrls: ['./suministros.component.css']
})
export class SuministrosComponent implements OnInit {
  tipoEquipo: any;
  identity: any;
  suministros : any[]=[];
  formSubmit: boolean;
  form : FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private _userServices : UserService,
    private _suministroService : SuministroService
    
  ) { }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    this.listarSuministrosClienteSinPaginacion();

    this.form = this.fb.group({
      tipo:["", Validators.required],//si
      nombre:["", Validators.required],//si
      v_dia : ["", Validators.required],//si
      iva : [ 19 , Validators.required ],//si
    });
  }

  //Listar todos los suministros del cliente sin paginacion
  listarSuministrosClienteSinPaginacion(){
    this._suministroService.listSuministrosClientSinPaginacion(this.identity.tercero)
        .subscribe((data:any)=>{
          this.suministros = data.suministros;
        })
  }
  //Crear suministros para clientes
  crearSuministro(form, suministroform){
    const formModel = this.form.value;
    let saveSuministro: SuministroModel ={
      tipo : formModel.tipo as string,
      nombre :formModel.nombre as string,
      v_dia :formModel.v_dia as string,
      iva :formModel.iva as string,
      tercero : this.identity.tercero,
      usuario_creador : this.identity._id
    };

    console.log(saveSuministro);
    this._suministroService.saveSuministroClient(saveSuministro)
        .subscribe((data:any)=>{
          this.listarSuministrosClienteSinPaginacion();
          swal('Exito',data.message, 'success');
          form.reset();
        })
  }
  //Buscar Equipos dede el campo input tipo dinamicamente
  buscarEquiposporTag(termino:any){
   
   
    this.longitud_nombre = 0;
    this.longitud_vDia = 0;
    this.longitud_iva = 0;
    this.longitud_tipo = termino.length;
    this.terminoTipo = termino;

    if(termino.length<=0){
      this.longitud_tipo = 0;
      this.listarSuministrosClienteSinPaginacion();
      return;
    }
    this._equipoServices.buscarEquiposInputDinamicoporTag(termino, 1)
        .subscribe((datos:any)=>{
          
          this.equipos = datos.equipos;
          this.total = datos.total;
          this.pages = datos.pages;
    })
  }


}

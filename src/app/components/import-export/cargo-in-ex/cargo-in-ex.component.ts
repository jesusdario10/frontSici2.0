import { Component, OnInit } from '@angular/core';
import { CargoService } from 'src/app/services/cargo.service';
import { UserService } from 'src/app/services/user.service';
declare var jQuery:any;
declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-cargo-in-ex',
  templateUrl: './cargo-in-ex.component.html',
  styleUrls: ['./cargo-in-ex.component.css']
})
export class CargoInExComponent implements OnInit {
  public archivoSubir :File;
  public identity;
  public cargos:any=[];
  public cargos2:any=[];
  public subir;
  public validar;
  public importar;
  public carga;
  public repetidas;
  public hayCargo;
  public validados;
  
  constructor(
    private _cargoService : CargoService,
    private _userServices : UserService,
  ) { 
    this.subir = 1;
    this.validar = 0;
    this.importar = 0;
    this.carga = 0;
    this.hayCargo = 0;
    this.repetidas = 0;
    this.validados = 0;
  }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
      //Este jquery activa la funcionalidad del input file para que se vea bien
      $(document).ready(function() {
        // Basic
        $('.dropify').dropify();

        // Translated
        $('.dropify-fr').dropify({
            messages: {
                default: 'Glissez-déposez un fichier ici ou cliquez',
                replace: 'Glissez-déposez un fichier ou cliquez pour remplacer',
                remove: 'Supprimer',
                error: 'Désolé, le fichier trop volumineux'
            }
        });
        // Used events
        var drEvent = $('#input-file-events').dropify();

        drEvent.on('dropify.beforeClear', function(event, element) {
            return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
        });

        drEvent.on('dropify.afterClear', function(event, element) {
            alert('File deleted');
        });

        drEvent.on('dropify.errors', function(event, element) {
            console.log('Has Errors');
        });

        var drDestroy = $('#input-file-to-destroy').dropify();
        drDestroy = drDestroy.data('dropify')
        $('#toggleDropify').on('click', function(e) {
            e.preventDefault();
            if (drDestroy.isDropified()) {
                drDestroy.destroy();
            } else {
                drDestroy.init();
            }
        })
    });
  }
  seleccionXlsx(archivo:File){
    this.listarCargosCliente();
    if(!archivo){
        this.archivoSubir= null;
      return
    }
    console.log(archivo.type);
    if(archivo.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      
      this.archivoSubir = null;
      swal('Error', "esto no es un archivo de excel", "error")
      return;
    }
    this.archivoSubir = archivo;
    this.carga = 1;
    this.validar = 0;
    this.importar = 0;
  }
  //subimos el archivo al backend
  cambiarArchivo()  {
    this.validar = 1;
    this.carga = 0;
    this._cargoService.subirCargosxlsx(this.archivoSubir, this.identity.tercero);       
  }
  //Capturamos el json que nos devuelve el backend y lo traemso al componente
  revisarDatos(){
    let cargosJson = this._cargoService.RevisarDatos();
    
    var contador = 0;
    if(this.repetidas == 1){
      this.cargos = cargosJson;
      swal("Inconsistencias en el archivo", "uno o varios cargos existentes", "info");
      return;
    }
    if(cargosJson.message){
      swal('error', "Archivo con estructura errada", "error")
    }else{
      //Si es la primera vez que voy a ingresar ubicaciones 
      if(this.cargos2.length == 0){
        this.hayCargo = 1;
        this.importar = 1
        this.validar = 0;
        this.carga = 0;
        this.cargos = cargosJson;
      
        swal("Exito", "Archivo validado", "success");
      }else{
        var contadorDeIguales = 0;
        for(var i = 0; i < cargosJson.length; i++){
          for(var j = 0; j < this.cargos2.length; j++){
            if(cargosJson[i].nombre == this.cargos2[j].nombre){
              cargosJson[i].nombre = cargosJson[i].nombre + ' - '+ 'Cargo Existe';
              this.repetidas = 1;
              contadorDeIguales = contadorDeIguales + 1;
            }
            if(!cargosJson[i].nombre){
              swal("Inconsistencias", `En la Linea ${i+1}`, "error");
              break;
            }else{
              if(contador == cargosJson.length){
                this.validados = 1;
              }
            }  
          } 
        }
        this.cargos = cargosJson;
        if(this.repetidas == 1){
          this.hayCargo = 1;
          swal("Inconsistencias en el archivo", "uno o varios cargos existentes", "info")
          return;
        }else{
          this.importar = 1
          this.validar = 0;
          this.carga = 0;
          this.hayCargo = 0;
          this.repetidas = 0;
        }       
      }        
    }
  }
  //Importamos los datos del archivo a la base de datos
  importarArchivo(){
    this._cargoService.importarCargos(this.cargos, this.identity.tercero)
        .subscribe((datos:any)=>{
          this.importar = 0;
          this.repetidas = 0;
          this.hayCargo = 0;
          
          swal("Exito","Cargos creados masivamente", "success" );
        })
  }

  //Listar el cargo del cliente para compararlo
  listarCargosCliente(){
    this._cargoService.listarCargoClienteSinpaginacion(this.identity.tercero)
        .subscribe((datos:any)=>{
          this.cargos2 = datos.cargos;

        })
  }

}

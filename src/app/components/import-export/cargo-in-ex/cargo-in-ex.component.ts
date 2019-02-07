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
  public subir;
  public validar;
  public importar;
  public carga;
  
  constructor(
    private _cargoService : CargoService,
    private _userServices : UserService,
  ) { 
    this.subir = 1;
    this.validar = 0;
    this.importar = 0;
    this.carga = 0;
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
    if(cargosJson.message){
      
      swal('error', "Archivo con estructura errada", "error")
    }else{
      for(var i = 0; i<cargosJson.length; i++){
        if(!cargosJson[i].nombre && !cargosJson[i].vhora_hombre || cargosJson[i].nombre == null || cargosJson[i].vhora_hombre == null){
          swal("Inconsistencias", `En la Linea ${i+1}`, "error");
          break;
        }else{
          contador = contador + 1;
          this.cargos = cargosJson;
          if(contador == cargosJson.length -1){
            swal("Exito", "Archivo validado", "success");
            this.importar = 1
            this.validar = 0;
            this.carga = 0;
          }
          
        }
      }
    }
  }
  //Importamos los datos del archivo a la base de datos
  importarArchivo(){
    this._cargoService.importarCargos(this.cargos, this.identity.tercero)
        .subscribe((datos:any)=>{
          this.importar = 0;
          swal("Exitoo","Cargos creados masivamente", "success" );
        })
  }

}

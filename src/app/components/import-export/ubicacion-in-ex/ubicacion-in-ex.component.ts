import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
declare var jQuery:any;
declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-ubicacion-in-ex',
  templateUrl: './ubicacion-in-ex.component.html',
  styleUrls: ['./ubicacion-in-ex.component.css']
})
export class UbicacionInExComponent implements OnInit {
  public archivoSubir :File;
  public identity;
  public ubicaciones:any=[];
  public subir;
  public validar;
  public importar;
  public carga;

    
  constructor(
    private _userServices : UserService,
    private _ubicacionService : UbicacionService
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
    this._ubicacionService.subirUbicacionesxlsx(this.archivoSubir, this.identity.tercero);   
  } 
  revisarDatos(){
    let ubicacionJson = this._ubicacionService.RevisarDatos();
    var contador = 0;
    if(ubicacionJson.message){
      swal('error', "Archivo con estructura errada", "error")
    }else{
      for(var i = 0; i<ubicacionJson.length; i++){
        if(!ubicacionJson[i].nombre){
          swal("Inconsistencias", `En la Linea ${i+1}`, "error");
          break;
        }else{
          contador = contador + 1;
          this.ubicaciones = ubicacionJson;
          if(contador == ubicacionJson.length -1){
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
    this._ubicacionService.importarUbicacion(this.ubicaciones, this.identity.tercero)
        .subscribe((datos:any)=>{
          this.importar = 0;
          swal("Exitoo","Ubicaciones creadas masivamente", "success" );
        })
  }  

}

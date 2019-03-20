import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LibreriaService } from 'src/app/services/libreria.service';
declare var jQuery:any;
declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-libreria-in-ext',
  templateUrl: './libreria-in-ext.component.html',
  styleUrls: ['./libreria-in-ext.component.css']
})
export class LibreriaInExtComponent implements OnInit {
  public archivoSubir :File;
  public identity;
  public librerias:any=[];
  public librerias2:any=[];
  public subir;
  public validar;
  public importar;
  public carga;
  public hayLibreria;
  public repetidas;
  public validados;
  public tipoEquipo;
  

  constructor(
    private _userServices : UserService,
    private _libreriaService : LibreriaService
  ) {
    this.hayLibreria = 0;
    this.subir = 1;
    this.validar = 0;
    this.importar = 0;
    this.carga = 0;
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
    this.listarLibreriasCliente();
    
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
    this.hayLibreria = 0;
  }
  //subimos el archivo al backend
  cambiarArchivo()  {
    this.validar = 1;
    this.carga = 0;
    this._libreriaService.subirLibreriasxlsx(this.archivoSubir, this.identity.tercero, this.tipoEquipo);       
  }
  //Capturamos el json que nos devuelve el backend y lo traemos al componente
  revisarDatos(){
    let libreriaJson = this._libreriaService.RevisarDatos();
    console.log(libreriaJson);
    var contador = 0;

    if(this.repetidas == 1){
      this.librerias = libreriaJson;
      swal("Inconsistencias en el archivo", "uno o mas librerias existentes", "info");
      return;
    }
    if(libreriaJson.message){
      swal('error', "Archivo con estructura errada", "error")
    }else{
      //Si es la primera vez que voy a ingresar librerias
      if(this.librerias2.length == 0){
        this.librerias = libreriaJson;
        this.hayLibreria = 1;
        this.importar = 1
        this.validar = 0;
        this.carga = 0;
        swal("Exito", "Archivo validado", "success");
      
      }else{
        var contadorDeIguales = 0;
        for(var i = 0; i<libreriaJson.length; i++){
          for(var j = 0; j < this.librerias2.length; j++){
            if(libreriaJson[i].nombre == this.librerias2[j].nombre){
              libreriaJson[i].nombre = libreriaJson[i].nombre + ' - '+ 'Libreria Existe';
              this.repetidas = 1;
              contadorDeIguales = contadorDeIguales + 1;
            }
            if(!libreriaJson[i].nombre){
              swal("Inconsistencias", `En la Linea ${i+1}`, "error");
              break;
            }else{
              if(contador == libreriaJson.length){
                this.validados = 1;
              }
            }  
          } 
        }
        this.librerias = libreriaJson;
        if(this.repetidas == 1){
          this.hayLibreria = 1;
          swal("Inconsistencias en el archivo", "una o varias librerias existentes", "info")
          return;
        }else{
          this.importar = 1
          this.validar = 0;
          this.carga = 0;
          this.hayLibreria = 0;
          this.repetidas = 0;
        }        
      }
    }
  } 
  //Importamos los datos del archivo a la base de datos
  importarArchivo(){
    this._libreriaService.importarLibrerias(this.librerias, this.identity.tercero)
        .subscribe((datos:any)=>{
          this.importar = 0;
          this.hayLibreria = 0;
          this.repetidas = 0;
          swal("Exito","Librerias creadas masivamente", "success" );
        })
  }
  //Listar las librerias del cliente
  listarLibreriasCliente(){
    this._libreriaService.listarLibreriasSinPaginacionCliente(this.identity.tercero)
        .subscribe((datos:any)=>{
          this.librerias2 = datos.librerias;
        })
  }
  tipoEquipoFunction(){
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    let tipo = extraer[5];
    this.tipoEquipo = tipo;
  }


}

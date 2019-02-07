import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { EquipoService } from 'src/app/services/equipo.service';

declare var jQuery:any;
declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-equipo-in-ext',
  templateUrl: './equipo-in-ext.component.html',
  styleUrls: ['./equipo-in-ext.component.css']
})


export class EquipoInExtComponent implements OnInit {
  public archivoSubir :File;
  public identity;
  public equipos:any=[];
  public equipos2:any=[];
  public mostrarEquipos:any=[];
  public subir;
  public validar;
  public importar;
  public carga;
  public existentes;//esta variable me dice si en el listado hay equipos existentes o no si es 0 no hay si es 1 si hay;

  constructor(
    private _userServices : UserService,
    private _equipoService : EquipoService
  ) {
    this.existentes = 0;
   }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
    this.equiposClientes();
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
  //Seleccionar el equipo en el input file
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
    this.existentes = 0;
    this.equipos = null;
  }
  //subimos el archivo al backend
  cambiarArchivo()  {
    this.validar = 1;
    this.carga = 0;
    this._equipoService.subirEquiposxlsx(this.archivoSubir, this.identity.tercero);       
  }  
  //Capturamos el json que nos devuelve el backend y lo traemso al componente
  revisarDatos(){
    console.log("entrando aqui");
    let equiposJson = this._equipoService.RevisarDatos();
    console.log(equiposJson);
    var contador = 0;
    if(equiposJson.message){
      swal('error', "Archivo con estructura errada", "error")
    }else{
      for(var h = 0; h < this.equipos2.length; h++){
          for(var i = 0; i < equiposJson.length; i++){
            if(this.equipos2[h].serial == equiposJson[i].serial){
              equiposJson[i].tag = "Equipo ya Existe"
              equiposJson[i].nombre_equipo = "Eliminelo del archivo"
              this.existentes = 1;
            }
            if(!equiposJson[i].serial && !equiposJson[i].tag || equiposJson[i].nombre_equipo == null){
              swal("Inconsistencias", `En la Linea ${i+1}`, "error");
              break;
            }else{
              contador = contador + 1;
              this.equipos = equiposJson;
              if(contador == equiposJson.length -1){
                swal("Exito", "Archivo validado", "success");
                this.importar = 1
                this.validar = 0;
                this.carga = 0;
              }
            }
          }
      }

    }
  } 
  //Importamos los datos del archivo a la base de datos
  importarArchivo(){
    if(this.existentes == 1){
      for(let i = 0; i < this.equipos.length; i++){
        if(this.equipos[i].tag =="Equipo ya Existe"){
          swal("Modifique", `Equipo posicion ${i+1}`, "info");
          console.log("aaa");
          return;
        }
      }
    }
    if(this.existentes == 0){
      this._equipoService.importarEquipos(this.equipos, this.identity.tercero)
      .subscribe((datos:any)=>{
        this.importar = 0;
        swal("Exitoo","Equipos creados masivamente", "success" );
      })
    }
  }  
  equiposClientes(){
    this._equipoService.listarTodoslosEquiposdelClientesinPaginacion(this.identity.tercero)
        .subscribe((datos:any)=>{
          this.equipos2 = datos.equipos;
          console.log(this.equipos2);
        })
  }

}
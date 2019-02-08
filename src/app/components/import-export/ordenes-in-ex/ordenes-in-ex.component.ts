import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { LibreriaService } from 'src/app/services/libreria.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import { OrdenImport } from 'src/app/models/actividadModel';


declare var jQuery:any;
declare var $:any;
declare var swal:any;

class OrdenImport2{
  constructor(
      public idEquipo? :string,
      public idLibreria? : string,
      public idUbicacion? : string,
      public prioridad? : string,
      public solicitante? : string,
      public comEquipos?: number,
      public conLibrerias?: number,
      public conUbicaciones?: number,
      public equipo?: string,
      public ubicacion?: string,
      public libreria?: string,
      public fecha_creacion? : string,
      public fecha_requerida?: string
  ){

  }
}


@Component({
  selector: 'app-ordenes-in-ex',
  templateUrl: './ordenes-in-ex.component.html',
  styleUrls: ['./ordenes-in-ex.component.css']
})
export class OrdenesInExComponent implements OnInit {
  public archivoSubir :File;
  public identity;
  public ordenes:any=[];
  public subir;
  public validar;
  public importar;
  public carga;
  public hayOrden;
  public ordenImport: OrdenImport2[]=[];

  public equipos: any=[];
  public librerias : any=[];
  public ubicaciones : any=[];
  
  public ExisteEquipo;
  public ExisteLibreria;
  public ExisteUbicacion;
  public prioridadBien;

  constructor(
    private _userServices : UserService,
    private _ordenService : OrdenesService,
    private _libreriaService : LibreriaService,
    private _equipoService : EquipoService,
    private _ubicacionService : UbicacionService,
  ) {
    this.subir = 1;
    this.validar = 0;
    this.importar = 0;
    this.carga = 0;
    this.ExisteEquipo = 0;
    this.ExisteLibreria = 0;
    this.ExisteUbicacion = 0;
    this.prioridadBien = 0;
    this.hayOrden = 0;
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
//Seleccionar el archivo
  seleccionXlsx(archivo:File){
    this.traerEquipos();
    this.traerLibrerias();
    this.traerUbicaciones();
    if(!archivo){
        this.archivoSubir= null;
      return
    }
 
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
    this._ordenService.subirOrdenesxlsx(this.archivoSubir, this.identity.tercero);       
  }  
  //Capturamos el json que nos devuelve el backend y lo traemos al componente
  revisarDatos(){
    let ordenJson = this._ordenService.RevisarDatos();
    this.hayOrden = 1;
    this.ordenes = ordenJson;
    
    console.log(ordenJson);

    if(ordenJson.message){
      swal('error', "Archivo con estructura errada", "error")
    }else{
      //Comparando si el equipo existe
      for(var i = 0; i< ordenJson.length; i++){
        for(var j = 0; j < this.equipos.length; j++){
          if(ordenJson[i].equipo == this.equipos[j].serial){
            ordenJson[i].comEquipos = 1;
            ordenJson[i].idEquipo = this.equipos[j]._id;
            this.ExisteEquipo = this.ExisteEquipo + 1;
          }
        }
        for(var k = 0; k < this.librerias.length; k++){
          if(ordenJson[i].libreria == this.librerias[k].nombre){
            ordenJson[i].conLibrerias = 1;
            ordenJson[i].idLibreria = this.librerias[k]._id;
            this.ExisteLibreria = 1;
          }
        }
        for(var l = 0; l < this.ubicaciones.length; l++){
          if(ordenJson[i].ubicacion == this.ubicaciones[l].nombre){
            ordenJson[i].conUbicaciones = 1;
            ordenJson[i].idUbicacion = this.ubicaciones[l]._id;
            this.ExisteUbicacion = 1;
          }
        }
        if(ordenJson[i].prioridad == 'ALTA' || ordenJson[i].prioridad == 'NORMAL' || ordenJson[i].prioridad == 'MEDIA' || ordenJson[i].prioridad == 'BAJA'){
          this.prioridadBien = 1;
        }
 
      }
      if(this.prioridadBien == 0){
        swal('Error', 'Prioridades deben ser en mayusculas', 'info');
        return;
      }
      if(this.ExisteEquipo == 0 || this.ExisteLibreria == 0 || this.ExisteUbicacion == 0){
        swal('Error', 'Verifique los datos', 'info');
        return;
      }else{
        //aqui hare un o(||) c omprobando tambien si existeubicacion y existe libreria son correctos(este es el resultado esperado)
        if(this.ExisteEquipo == ordenJson.length){
          
          this.importar = 1
          this.validar = 0;
          this.carga = 0;
          this.ordenImport = ordenJson;
          swal("Exito", "Archivo validado", "success");
        }else{
         //aqui un si para comprobar si el faltante es el equipo o si es la libreria o si es la ubicacion(esta es la validacion para que no pueda enviar ordenes si hay problemas)
        }
       
       

      }
    }
  }







  //Importamos los datos del archivo a la base de datos
  importarArchivo(){
    console.log(this.ordenImport);
    this._ordenService.importarOrden(this.ordenImport, this.identity.tercero)
        .subscribe((datos:any)=>{
          console.log(datos);
          //this.importar = 0;
          swal("Exitoo","Ordenes creadas masivamente", "success" );
        })
  }
  
  //Traer todos los equipos del cliente para validar si de verdad existen
  traerEquipos(){
    this._equipoService.listarTodoslosEquiposdelClientesinPaginacion(this.identity.tercero)
        .subscribe((datos)=>{
    
          this.equipos = datos.equipos;
        })
  }
  //Traer las librerias del cliente para ver si de verdad existen
  traerLibrerias(){
    this._libreriaService.listarLibreriasSinPaginacionCliente(this.identity.tercero)
        .subscribe((datos:any)=>{
          this.librerias =datos.librerias;
        })
  }
  //Traer las ubicaciones del cliente para ver si existen
  traerUbicaciones(){
    this._ubicacionService.listarUbicacionesClienteSinPaginado(this.identity.tercero)
        .subscribe((datos:any)=>{
          this.ubicaciones = datos.ubicaciones;
        })
  }

}

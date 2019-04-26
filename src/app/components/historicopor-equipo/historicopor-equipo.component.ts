import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-historicopor-equipo',
  templateUrl: './historicopor-equipo.component.html',
  styleUrls: ['./historicopor-equipo.component.css']
})
export class HistoricoporEquipoComponent implements OnInit {
  tercero:string;
  equipo:string;

  constructor(
    private _ordenService : OrdenesService,

  ) {
    //extraer tercero y equipo
    let urlActual =  window.location.href;
    let extraer = urlActual.split('/');
    this.tercero = extraer[4];
    this.equipo = extraer[5];
   }

  ngOnInit() {
    console.log(this.tercero, this.equipo);
    this.listarActividadesporEquipos();
  }
  listarActividadesporEquipos(){
    this._ordenService.listarlasactividadesporClienteyequipo(this.tercero, this.equipo)
        .subscribe((data:any)=>{
          console.log(data);
        })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subida-equipos',
  templateUrl: './subida-equipos.component.html',
  styleUrls: ['./subida-equipos.component.css']
})
export class SubidaEquiposComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  subirExcel(value){
    console.log(value);
    if(value == 'Transmisores'){
      this.router.navigate(['/import-export/equipo/Transmisores']);
    }
    if(value == 'Indicadores'){
      this.router.navigate(['/import-export/equipo/Indicadores']);
    }
    if(value == 'Valvulas'){
      this.router.navigate(['/import-export/equipo/Valvulas']);
    }
  }

}

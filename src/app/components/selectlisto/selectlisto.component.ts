import {Component, OnInit, NgModule, ViewChild} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-selectlisto',
  templateUrl: './selectlisto.component.html',
  styleUrls: ['./selectlisto.component.css']
})
export class SelectlistoComponent implements OnInit {
      cities = [
        {id: 1, name: 'Vilnius'},
        {id: 2, name: 'Kaunas'},
        {id: 3, name: 'Pavilnys', disabled: true},
        {id: 4, name: 'Pabradė'},
        {id: 5, name: 'Klaipėda'}
      ];



  





    selectedCity: any;


    constructor() {
        //this.create10kCities();
    }

    

  ngOnInit() {
  }


}

import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { PERSONS, Person} from '../../models/person';
import { TableExport } from 'tableexport';

// **** jQuery **************************
 import $ from 'jquery';
 import 'tableexport';
// **************************************


@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styleUrls: ['./excel-export.component.css']
})
export class ExcelExportComponent implements OnInit  {
  persons: Person[];
  public te: TableExport;

  constructor(
    private excelService : ExportExcelService
  ){
    this.excelService = excelService;
    this.persons = PERSONS;
   }

  ngOnInit() {
    new TableExport(document.querySelector('#default-table')).reset();
  }
  exportToExcel(event) {
    this.excelService.exportAsExcelFile(PERSONS, 'persons');
  }
  public ngAfterViewChecked() {
    // NOTE: the `reset` is to prevent multiple renders on state change
    new TableExport(document.querySelector('#default-table')).reset();
    // **** jQuery **************************
    // $('#default-table').tableExport().reset();
    // **************************************
  }

}

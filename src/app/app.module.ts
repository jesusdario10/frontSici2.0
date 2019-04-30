//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//chart para graficas
import { ChartsModule } from 'ng2-charts';

//Angular Material Modules
import {MatButtonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';




//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { routing, appRoutingProviders } from './app.routing';

//Servicios 
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';
import { ErrorComponent } from './components/error/error.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ConfigClienteComponent } from './components/config-cliente/config-cliente.component';
import { CargosClienteComponent } from './components/cargos-cliente/cargos-cliente.component';
import { CargoClienteEditComponent } from './components/cargo-cliente-edit/cargo-cliente-edit.component';
import { UbicacionClientComponent } from './components/ubicacion-client/ubicacion-client.component';
import { UbicacionClientEditComponent } from './components/ubicacion-client-edit/ubicacion-client-edit.component';
import { EquipoClienteComponent } from './components/equipos/equipo-cliente/equipo-cliente.component';
import { EquipoClienteEditComponent } from './components/equipos/equipo-cliente-edit/equipo-cliente-edit.component';
import { LibreriaClienteComponent } from './components/librerias/libreria-cliente/libreria-cliente.component';
import { LibreriaClienteEditComponent } from './components/librerias/libreria-cliente-edit/libreria-cliente-edit.component';
import { ConfigAdminComponent } from './components/config-admin/config-admin.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteEditComponent } from './components/cliente-edit/cliente-edit.component';
import { ConsecutivosComponent } from './components/consecutivos/consecutivos.component';
import { ConsecutivoEditComponent } from './components/consecutivo-edit/consecutivo-edit.component';
import { OrdenesClienteComponent } from './components/ordenes/ordenes-cliente/ordenes-cliente.component';
import { OrdenesClienteCrearComponent } from './components/ordenes/ordenes-cliente-crear/ordenes-cliente-crear.component';
import { OrdenesClienteGestionComponent } from './components/ordenes/ordenes-cliente-gestion/ordenes-cliente-gestion.component';
import { OrdenesClienteVerComponent } from './components/ordenes/ordenes-cliente-ver/ordenes-cliente-ver.component';
import { AvanceClienteComponent } from './components/avance/avance-cliente/avance-cliente.component';
import { AvanceClienteDonaComponent } from './components/avance/avance-cliente-dona/avance-cliente-dona.component';
import { AvanceClienteLineaComponent } from './components/avance/avance-cliente-linea/avance-cliente-linea.component';
import { AvanceClienteVerComponent } from './components/avance/avance-cliente-ver/avance-cliente-ver.component';
import { AvanceClienteLineaVerComponent } from './components/avance/avance-cliente-linea-ver/avance-cliente-linea-ver.component';
import { ExcelExportComponent } from './components/excel-export/excel-export.component';
import { ExportExcelService } from './services/export-excel.service';
import { ImportExportComponent } from './components/import-export/import-export.component';
import { CargoInExComponent } from './components/import-export/cargo-in-ex/cargo-in-ex.component';
import { UbicacionInExComponent } from './components/import-export/ubicacion-in-ex/ubicacion-in-ex.component';
import { LibreriaInExtComponent } from './components/import-export/libreria-in-ext/libreria-in-ext.component';
import { EquipoInExtComponent } from './components/import-export/equipo-in-ext/equipo-in-ext.component';
import { SubirArchivosService } from './services/subir-archivos.service';
import { OrdenesInExComponent } from './components/import-export/ordenes-in-ex/ordenes-in-ex.component';
import { BusquedasComponent } from './components/busquedas/busquedas.component';
import { SubidaEquiposComponent } from './components/import-export/subida-equipos/subida-equipos.component';
import { SelectlistoComponent } from './components/selectlisto/selectlisto.component';
import { HistoricoporEquipoComponent } from './components/historicopor-equipo/historicopor-equipo.component';
import { CcostosComponent } from './components/ccostos/ccostos.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    InicioComponent,
    ErrorComponent,
    PerfilComponent,
    ConfigClienteComponent,
    CargosClienteComponent,
    CargoClienteEditComponent,
    UbicacionClientComponent,
    UbicacionClientEditComponent,
    EquipoClienteComponent,
    EquipoClienteEditComponent,
    LibreriaClienteComponent,
    LibreriaClienteEditComponent,
    ConfigAdminComponent,
    ClientesComponent,
    ClienteEditComponent,
    ConsecutivosComponent,
    ConsecutivoEditComponent,
    OrdenesClienteComponent,
    OrdenesClienteCrearComponent,
    OrdenesClienteGestionComponent,
    OrdenesClienteVerComponent,
    AvanceClienteComponent,
    AvanceClienteDonaComponent,
    AvanceClienteLineaComponent,
    AvanceClienteVerComponent,
    AvanceClienteLineaVerComponent,
    ExcelExportComponent,
    ImportExportComponent,
    CargoInExComponent,
    UbicacionInExComponent,
    LibreriaInExtComponent,
    EquipoInExtComponent,
    OrdenesInExComponent,
    BusquedasComponent,
    SubidaEquiposComponent,
    SelectlistoComponent,
    HistoricoporEquipoComponent,
    CcostosComponent,
  
    


    
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    routing,
    ChartsModule
  ],
  providers: [appRoutingProviders,
              UserService,
              UserGuard,
              ExportExcelService,
              SubirArchivosService
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }

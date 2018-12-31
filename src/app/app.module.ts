//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//Angular Material Modules
import {MatButtonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatGridListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
  ],
  imports: [
    BrowserModule,
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
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders,
              UserService,
              UserGuard
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }

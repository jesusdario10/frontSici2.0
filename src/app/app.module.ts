//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//Angular Material Modules
import {MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatAutocompleteModule, MatSelectModule} from '@angular/material';
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
    UbicacionClientEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
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

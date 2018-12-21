import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';

//servicios
import { UserGuard } from './services/user.guard';
import { ErrorComponent } from './components/error/error.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ConfigClienteComponent } from './components/config-cliente/config-cliente.component';
import { CargosClienteComponent } from './components/cargos-cliente/cargos-cliente.component';
import { CargoClienteEditComponent } from './components/cargo-cliente-edit/cargo-cliente-edit.component';
import { UbicacionClientComponent } from './components/ubicacion-client/ubicacion-client.component';
import { UbicacionClientEditComponent } from './components/ubicacion-client-edit/ubicacion-client-edit.component';


const appRoutes : Routes = [
    
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate:[UserGuard]},
    {path: 'perfil', component: PerfilComponent, canActivate:[UserGuard]},
    {path: 'config', component: ConfigClienteComponent, canActivate:[UserGuard]},
    {path: 'cargos/:page', component: CargosClienteComponent, canActivate:[UserGuard]},
    {path: 'cargosedit/:id', component: CargoClienteEditComponent, canActivate:[UserGuard]},
    {path: 'ubicacion/:page', component: UbicacionClientComponent, canActivate:[UserGuard]},
    {path: 'ubicacionedit/:id', component: UbicacionClientEditComponent, canActivate:[UserGuard]},
    {path: '**', component: ErrorComponent},
    
];


export const appRoutingProviders : any[]=[];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes)

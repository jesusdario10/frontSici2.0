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
import { ImportExportComponent } from './components/import-export/import-export.component';
import { CargoInExComponent } from './components/import-export/cargo-in-ex/cargo-in-ex.component';
import { UbicacionInExComponent } from './components/import-export/ubicacion-in-ex/ubicacion-in-ex.component';
import { LibreriaInExtComponent } from './components/import-export/libreria-in-ext/libreria-in-ext.component';
import { EquipoInExtComponent } from './components/import-export/equipo-in-ext/equipo-in-ext.component';
import { OrdenesInExComponent } from './components/import-export/ordenes-in-ex/ordenes-in-ex.component';
import { BusquedasComponent } from './components/busquedas/busquedas.component';
import { SubidaEquiposComponent } from './components/import-export/subida-equipos/subida-equipos.component';





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
    {path: 'equipoCliente/:page', component: EquipoClienteComponent, canActivate:[UserGuard]},
    {path: 'equiposClienteEdit/:id', component: EquipoClienteEditComponent, canActivate:[UserGuard]},
    {path: 'equiposClienteEdit/:id', component: EquipoClienteEditComponent, canActivate:[UserGuard]},
    {path: 'libreriasCliente/:page', component: LibreriaClienteComponent, canActivate:[UserGuard]},
    {path: 'libreriaClienteEdit/:id', component: LibreriaClienteEditComponent, canActivate:[UserGuard]},
    {path: 'configsu', component: ConfigAdminComponent, canActivate:[UserGuard]},//hay que crear un guad solo para admin
    {path: 'clientes/:page', component: ClientesComponent, canActivate:[UserGuard]},//hay que crear un guad solo para admin
    {path: 'terceroEdit/:id', component: ClienteEditComponent, canActivate:[UserGuard]},//hay que crear un guad solo para admin
    {path: 'consecutivos/:page', component: ConsecutivosComponent, canActivate:[UserGuard]},//hay que crear un guad solo para admin
    {path: 'consecutivoEdit/:page', component: ConsecutivoEditComponent, canActivate:[UserGuard]},//hay que crear un guad solo para admin
    {path: 'ordenesC/:page', component: OrdenesClienteComponent, canActivate:[UserGuard]},
    {path: 'ordenesClienteCrear', component: OrdenesClienteCrearComponent, canActivate:[UserGuard]},
    {path: 'ordenesCgestion/:id', component: OrdenesClienteGestionComponent, canActivate:[UserGuard]},
    {path: 'ordenesCver/:id', component: OrdenesClienteVerComponent, canActivate:[UserGuard]},
    {path: 'avanceCliente', component: AvanceClienteComponent, canActivate:[UserGuard]},
    {path: 'graficoClienteDona/:page', component: AvanceClienteDonaComponent, canActivate:[UserGuard]},
    {path: 'graficoClienteDonaVer/:id', component: AvanceClienteVerComponent, canActivate:[UserGuard]},
    {path: 'graficoClienteLinea/:page', component: AvanceClienteLineaComponent, canActivate:[UserGuard]},
    {path: 'graficoClienteLineaVer/:id', component: AvanceClienteLineaVerComponent, canActivate:[UserGuard]},
    {path: 'export', component: ExcelExportComponent, canActivate:[UserGuard]},
    {path: 'import-export', component: ImportExportComponent, canActivate:[UserGuard]},
    {path: 'import-export/cargos', component: CargoInExComponent, canActivate:[UserGuard]},
    {path: 'import-export/ubicacion', component: UbicacionInExComponent, canActivate:[UserGuard]},
    {path: 'import-export/librerias', component: LibreriaInExtComponent, canActivate:[UserGuard]},
    {path: 'import-export/equipo/:tipo', component: EquipoInExtComponent, canActivate:[UserGuard]},
    {path: 'import-export/orden', component: OrdenesInExComponent, canActivate:[UserGuard]},
    {path: 'busquedas/:page', component: BusquedasComponent, canActivate:[UserGuard]},
    {path: 'import-export/subirequipo', component: SubidaEquiposComponent, canActivate:[UserGuard]},
    {path: '**', component: ErrorComponent},
];


export const appRoutingProviders : any[]=[];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes)


import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { CheckUser } from '../../app/services/checkUser';
import { AuthGuard } from '../services/authGuard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'tarea',
      loadChildren: () => import('./tareas/tarea.module')
        .then(m => m.TareaModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'area',
      loadChildren: () => import('./area/area.module')
        .then(m => m.AreaModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'colaborador',
      loadChildren: () => import('./colaborador/colaborador.module')
        .then(m => m.ColaboradorModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'epica',
      loadChildren: () => import('./epica/epica.module')
        .then(m => m.EpicaModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'equipo',
      loadChildren: () => import('./equipo/equipo.module')
        .then(m => m.EquipoModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'estatus-tarea',
      loadChildren: () => import('./estatus_tarea/estatus_tarea.module')
        .then(m => m.EstatusTareaModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'prioridad',
      loadChildren: () => import('./prioridad/prioridad.module')
        .then(m => m.PrioridadModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'proyecto',
      loadChildren: () => import('./proyecto/proyecto.module')
        .then(m => m.ProyectoModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'ticket',
      loadChildren: () => import('./ticket/ticket.module')
        .then(m => m.TicketModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'accesos',
      loadChildren: () => import('./access_control/access_control.module')
        .then(m => m.AccessControlModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'ticketStatus',
      loadChildren: () => import('./ticket-status/ticketStatus.module')
        .then(m => m.TicketStatusModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'reporteTareas',
      loadChildren: () => import('./reporte_proyectos/reporte_proyectos.module')
        .then(m => m.reporteTareasModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'mis-tareas',
      loadChildren: () => import('./mis-tareas/mis-tareas.module')
        .then(m => m.MisTareasModule),
        canActivate: [AuthGuard],
    },
    {
      path: '**',
      component: NotFoundComponent,
    },

  ],
}];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}










/*    /*{
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },*/
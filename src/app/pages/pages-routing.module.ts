import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
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
    },
    {
      path: 'tarea',
      loadChildren: () => import('./tareas/tarea.module')
        .then(m => m.TareaModule),
    },
    {
      path: 'area',
      loadChildren: () => import('./area/area.module')
        .then(m => m.AreaModule),
    },
    {
      path: 'colaborador',
      loadChildren: () => import('./colaborador/colaborador.module')
        .then(m => m.ColaboradorModule),
    },
    {
      path: 'epica',
      loadChildren: () => import('./epica/epica.module')
        .then(m => m.EpicaModule),
    },
    {
      path: 'equipo',
      loadChildren: () => import('./equipo/equipo.module')
        .then(m => m.EquipoModule),
    },
    {
      path: 'estatus-tarea',
      loadChildren: () => import('./estatus_tarea/estatus_tarea.module')
        .then(m => m.EstatusTareaModule),
    },
    {
      path: 'prioridad',
      loadChildren: () => import('./prioridad/prioridad.module')
        .then(m => m.PrioridadModule),
    },
    {
      path: 'proyecto',
      loadChildren: () => import('./proyecto/proyecto.module')
        .then(m => m.ProyectoModule),
    },
    {
      path: 'ticket',
      loadChildren: () => import('./ticket/ticket.module')
        .then(m => m.TicketModule),
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

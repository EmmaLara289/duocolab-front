import { NbMenuItem } from '@nebular/theme';
import { CheckUser } from '../services/checkUser';


const aux = localStorage.getItem('respuesta');


const aux2: NbMenuItem[] = JSON.parse(aux);
/*
  if(localStorage.getItem('menu') === "1"){
    window.location.href = window.location.href;
    localStorage.setItem('menu', JSON.stringify(2));
  }*/
export const MENU_ITEMS: NbMenuItem[] = aux2;

/*
export const MENU_ITEMS: NbMenuItem[] = [

  {
    icon: 'edit-2-outline',
    title: 'Accesos',
    link: '/pages/accesos'
  },
  {
    icon: 'edit-2-outline',
    title: 'Colaboradores',
    link: '/pages/colaborador'
  },
  {
    icon: 'edit-2-outline',
    title: 'Equipos',
    link: '/pages/equipo'
  },
  {
    icon: 'edit-2-outline',
    title: 'Proyectos',
    link: '/pages/proyecto'
  },
  {
    icon: 'edit-2-outline',
    title: 'Epicas',
    link: '/pages/epica'
  },
  {
    icon: 'edit-2-outline',
    title: 'Tareas',
    link: '/pages/tarea'
  },
  {
    icon: 'edit-2-outline',
    title: 'Areas',
    link: '/pages/area'
  },
  {
    icon: 'edit-2-outline',
    title: 'Estatus Tareas',
    link: '/pages/estatus-tarea'
  },
  {
    icon: 'edit-2-outline',
    title: 'Prioridades',
    link: '/pages/prioridad'
  },
  {
    icon: 'edit-2-outline',
    title: 'Ticket',
    link: '/pages/ticket'
  },
  {
    icon: 'edit-2-outline',
    title: 'Estatus de Tickets',
    link: '/pages/ticketStatus'
  },
]*/


/*
let MENU_ITEMS: NbMenuItem[];
console.log(CheckUser.key_role);
if (CheckUser.key_role === 2) {
  MENU_ITEMS = [
  
    {
      icon: 'edit-2-outline',
      title: 'Tareas',
      link: '/pages/tarea'
    },
    {
      icon: 'edit-2-outline',
      title: 'Areas',
      link: '/pages/area'
    },
  ];
}else if(CheckUser.key_role === 1){ 
  MENU_ITEMS = [
  {
    icon: 'edit-2-outline',
    title: 'Tareas',
    link: '/pages/tarea'
  },
  {
    icon: 'edit-2-outline',
    title: 'Areas',
    link: '/pages/area'
  },
  {
    icon: 'edit-2-outline',
    title: 'Colaboradores',
    link: '/pages/colaborador'
  },
  {
    icon: 'edit-2-outline',
    title: 'Epicas',
    link: '/pages/epica'
  },
  {
    icon: 'edit-2-outline',
    title: 'Equipos',
    link: '/pages/equipo'
  },
  {
    icon: 'edit-2-outline',
    title: 'Estatus Tareas',
    link: '/pages/estatus-tarea'
  },
  {
    icon: 'edit-2-outline',
    title: 'Prioridades',
    link: '/pages/prioridad'
  },
  {
    icon: 'edit-2-outline',
    title: 'Proyectos',
    link: '/pages/proyecto'
  },
  {
    icon: 'edit-2-outline',
    title: 'Ticket',
    link: '/pages/ticket'
  }
];
}

export { MENU_ITEMS };

*/







/*
/*{
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/layout/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Extra Components',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'text-outline',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
*/
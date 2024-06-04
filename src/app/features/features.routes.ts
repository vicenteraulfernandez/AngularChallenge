import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import CityComponent from './city/city.component';

const route: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'LWX/:title/:city',
        loadComponent: () => import('./city/city.component'),
      },
      {
        path: 'TOP/:title/:city',
        loadComponent: () => import('./city/city.component'),
      },
    ],
  },
];

export default route;

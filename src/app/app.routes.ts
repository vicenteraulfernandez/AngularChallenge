import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
    {path:'',redirectTo:'weather',pathMatch:'full'},
    {path:'weather',loadChildren:()=>import('./features/features.routes')},
    {path:'**',component:NotFoundComponent}
];

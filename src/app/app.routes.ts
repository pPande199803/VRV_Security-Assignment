import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { RolePermissionComponent } from './pages/role-permission/role-permission.component';

export const routes: Routes = [
    {path:"", redirectTo:"user-list", pathMatch:'full'},
    {path:"user-list", component:HomeComponent},
    {path:"user-detail/:id" ,component:DetailsComponent},
    {path:"role-permission" ,component:RolePermissionComponent},
];

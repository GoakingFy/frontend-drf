import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { BrandsComponent } from './brands/brands.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'users' , component: UsersComponent},
  {path: 'vehiculos' , component: VehiclesComponent},
  {path: 'marcas' , component: BrandsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

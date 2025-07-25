import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './Shared/Components/not-found/not-found/not-found.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  //lazy loading
  {path:'account', loadChildren:() => import('./account/account.module').then(module =>module.AccountModule)},
  
  {path:'not-found', component:NotFoundComponent},
  {path:'**', component:NotFoundComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddupdateComponent } from './addupdate/addupdate.component';
import { DatalistComponent } from './datalist/datalist.component';
import { HomeComponent } from './home/home.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'datalist',
    component:DatalistComponent
  },
  {
    path:'addedit',
    component:AddupdateComponent
  },
  {
    path:'userdetails',
    component:UserdetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

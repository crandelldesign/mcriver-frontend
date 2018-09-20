import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminSignUpsComponent } from './admin-sign-ups/admin-sign-ups.component';
import { AdminEquipmentTotalsComponent } from './admin-equipment-totals/admin-equipment-totals.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: {title: 'Admin'},
    children: [
      {path: '', component: AdminHomeComponent, data: {title: 'Dashboard'}},
      {path: 'home', redirectTo: '', pathMatch: 'full' },
      {path: 'sign-ups', component: AdminSignUpsComponent, data: {title: 'Sign Ups'}},
      {path: 'equipment', component: AdminEquipmentTotalsComponent, data: {title: 'Equipment Totals'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

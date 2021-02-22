import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMomentComponent } from './add-moment/add-moment.component';
import { DashboardComponent } from './dashboard.component';
import { EditMomentComponent } from './edit-moment/edit-moment.component';
import { MomentListComponent } from './moment-list/moment-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'moments-list',
    pathMatch: 'full',
  },

  {
    path: 'moments-list',
    component: MomentListComponent,
  },
  {
    path: 'add-moment',
    component: AddMomentComponent,
  },
  {
    path: 'edit-moment',
    component: EditMomentComponent,
    data: {},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MomentListComponent } from './moment-list/moment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddMomentComponent } from './add-moment/add-moment.component';

@NgModule({
  declarations: [MomentListComponent, DashboardComponent, AddMomentComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule {}

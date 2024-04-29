import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../core/shared/shared.module';
import { UsersModule } from './pages/users/users.module';
import { HomeModule } from './pages/home/home.module';
import { InscriptionsModule } from './pages/inscriptions/inscriptions.module';
import { CoursesModule } from './pages/courses/courses.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    UsersModule,
    HomeModule,
    InscriptionsModule,
    CoursesModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }

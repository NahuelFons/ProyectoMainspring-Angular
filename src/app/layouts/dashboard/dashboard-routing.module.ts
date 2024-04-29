import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', loadChildren: () => import ('./pages/home/home.module'). then ((m) => m.HomeModule), },
      { path: 'students', loadChildren: () => import ('./pages/users/users.module'). then ((m) => m.UsersModule), },
      //{ path: 'teachers', loadChildren: () => import ('./pages/teachers/teachers.module'). then ((m) => m.TeachersModule), }
      { path: 'courses', loadChildren: () => import ('./pages/courses/courses.module'). then ((m) => m.CoursesModule), },
      { path: 'inscriptions', loadChildren: () => import ('./pages/inscriptions/inscriptions.module'). then ((m) => m.InscriptionsModule), }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

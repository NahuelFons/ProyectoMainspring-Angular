import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../../../core/shared/shared.module';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ],
  exports:[
    UsersComponent
  ]
})
export class UsersModule { }

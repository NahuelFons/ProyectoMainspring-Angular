import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUsers } from '../../models';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  user$: Observable<IUsers | undefined>

  constructor (private activatedRoute: ActivatedRoute, private usersService: UsersService) {
    this.user$ = this.usersService.getUserById(this.activatedRoute.snapshot.params['id'])
  }
  
}

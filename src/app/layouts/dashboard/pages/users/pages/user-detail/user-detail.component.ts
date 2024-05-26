import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUsers } from '../../models';
import { UsersService } from '../../users.service';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';
import { IInscription } from '../../../inscriptions/models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  user$: Observable<IUsers | undefined>
  inscription$: Observable<IInscription[]>

  constructor (
    private activatedRoute: ActivatedRoute, 
    private usersService: UsersService,
    private inscriptionService: InscriptionsService) 
    {
    this.user$ = this.usersService.getUserById(this.activatedRoute.snapshot.params['id'])
    this.inscription$ = this.inscriptionService.getInscriptionsByUserId(this.activatedRoute.snapshot.params['id'])
    }
  
}

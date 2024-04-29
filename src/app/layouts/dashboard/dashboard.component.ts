import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/service/auth.services';
import { IUsers } from './pages/users/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  showFiller = false;

  authUser$: Observable<IUsers | null>;

  constructor(private authService: AuthService, private router: Router){
    this.authUser$ = this.authService.authUser$;
  }
  ngOnInit(): void {
  }

  login(): void{
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
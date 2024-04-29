import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnDestroy, OnInit{
  authUserChangeSubscription?: Subscription; 

  constructor(private authService: AuthService, private router: Router) {} 

  ngOnInit(): void {
    this.SubscribeToAuthUserChange();
  }

  ngOnDestroy(): void {
    this.authUserChangeSubscription?.unsubscribe();
  }

  SubscribeToAuthUserChange(): void{
    this.authUserChangeSubscription = this.authService.authUser$.subscribe({
      next: (authUser) => {
        if (authUser != null){
          this.router.navigate(['dashboard', 'home']);
        }
      },
    });
  }

  login() {
    this.authService.login();
  }
}
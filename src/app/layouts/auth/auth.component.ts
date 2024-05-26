import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth/auth.actions';
import { authUser } from '../../store/auth/auth.selectors';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnDestroy, OnInit{
  authUserChangeSubscription?: Subscription; 
  loginForm: FormGroup;

  authUserSubscription?: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]],
        password: ['', [Validators.required]]
      })
    } 

  ngOnInit(): void {
    this.authUserSubscription = this.store.select(authUser).subscribe({
      next: (user) => {
        if(user) this.router.navigate(['dashboard', 'home'])
      }
    })
  }

  ngOnDestroy(): void {
    this.authUserChangeSubscription?.unsubscribe();
  }

  login() {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    } else {
      this.store.dispatch(authActions.login({ payload: this.loginForm.getRawValue()}))
    }
  }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnDestroy, OnInit{
  authUserChangeSubscription?: Subscription; 
  loginForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]],
        password: ['', [Validators.required]]
      })
    } 

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.authUserChangeSubscription?.unsubscribe();
  }

  login() {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.loginForm.getRawValue());
    }
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUsers } from '../../layouts/dashboard/pages/users/models';
import { LoginData } from '../../layouts/auth/models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private MOCK_AUTH_USER: IUsers = {
    id: 1,
    firstName: 'Nahuel',
    lastName: 'Fons',
    englishLevel: 'C2',
    email: 'nahuelfons@gmai.com',
    role: 'ADMIN',
    createdAt: new Date(),
  }
  private _authUser$ = new BehaviorSubject<IUsers | null> (null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: LoginData): void{
    if (data.email !== 'nahuelfons@gmail.com' || data.password !== '123123') {
      alert('Correo o password incorrectos')
    } else {
      this._authUser$.next(this.MOCK_AUTH_USER);
      localStorage.setItem('accessToken', '54736587347482')
    }
    this.router.navigate(['dashboard', 'home']); 
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken'); 
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void{
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUsers } from '../../layouts/dashboard/pages/users/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<IUsers | null> (null);
  public authUser$ = this._authUser$.asObservable();

  login(): void{
    this._authUser$.next({
      id: 1,
      firstName: 'Nahuel',
      lastName: 'Fons',
      email: 'nahuelfons@gmai.com',
      createdAt: new Date(),
      englishLevel: 'C2'
    });
  }

  logout(): void{
    this._authUser$.next(null);
  }

}

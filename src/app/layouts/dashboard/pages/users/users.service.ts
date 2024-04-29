import { Injectable } from "@angular/core";
import { IUsers } from "./models";
import { Observable, delay, of } from "rxjs";

const USERS_DB: IUsers [] = [
    {
        id: 1,
        firstName: 'Nahuel',
        lastName: 'Fons',
        englishLevel: 'B1',
        email: 'nahuelfons@gmail.com',
        createdAt: new Date()
    },
    {
        id: 2,
        firstName: 'Lautaro',
        lastName: 'Cabrera',
        englishLevel: 'B1',
        email: 'lautarocabrera@gmail.com',
        createdAt: new Date()
    },
    {
        id: 3,
        firstName: 'Katja',
        lastName: 'Schmukler',
        englishLevel: 'A2',
        email: 'katjaschmuckler@gmail.com',
        createdAt: new Date()
    },
]

@Injectable({ providedIn: 'root'})
export class UsersService {
    
    getUsers(): Observable<IUsers[]> {
        return of(USERS_DB).pipe(delay(300))
    }

    getUserById(id:number): Observable<IUsers | undefined> {
        return of(USERS_DB.find((element) => element.id === id))
    }

}
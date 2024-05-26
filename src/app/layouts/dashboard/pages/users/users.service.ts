import { Injectable } from "@angular/core";
import { CreateUserPayload, IUsers } from "./models";
import { Observable, delay, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Injectable({ providedIn: 'root'})
export class UsersService {

    constructor(private httpClient: HttpClient) {}
    
    getUsers(): Observable<IUsers[]> {
        return this.httpClient.get<IUsers[]>(environment.baseAPIURL + '/users')
    }

    getUserById(id:number): Observable<IUsers | undefined> {
        return this.httpClient.get<IUsers>(environment.baseAPIURL + '/users/' + id)
    }

    createUsers(payload: CreateUserPayload): Observable<IUsers> {
        return this.httpClient.post<IUsers>(environment.baseAPIURL + '/users', payload)
    }

}
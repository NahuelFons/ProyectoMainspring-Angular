import { Injectable } from "@angular/core";
import { ICreateInscriptionPayload, IInscription } from "./models";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { IUsers } from "../users/models";

@Injectable({ providedIn: 'root' })
export class InscriptionsService {

  constructor(private httpClient: HttpClient) {}

  getInscriptions(): Observable<IInscription[]> {
    return this.httpClient.get<IInscription[]>(environment.baseAPIURL + '/inscriptions?_embed=user&_embed=course')
  }

  getInscriptionsByUserId(uid: string): Observable<IInscription[]> {
    return this.httpClient.get<IInscription[]>
    (`${environment.baseAPIURL}/inscriptions?userId=${uid}&_embed=course`)
  }

  createInscription(payload: ICreateInscriptionPayload): Observable<IInscription> {
    return this.httpClient.post<IInscription>(environment.baseAPIURL + '/inscriptions', payload);
  }

  deleteInscriptionById(id: string): Observable<IInscription> {
    return this.httpClient.delete<IInscription>(`${environment.baseAPIURL}/inscriptions/${id}`)
  }

}
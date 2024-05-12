import { Injectable } from "@angular/core";
import { ICreateInscriptionData, IInscription } from "./models";
import { BehaviorSubject, Observable, of } from "rxjs";

let INSCRIPTIONS_DB: IInscription [] = [
    {
        id: 1,
        course: {
            id: 1,
            name: 'Senior 1 to 6',
            description: '',
            price: 0
        },
        enrolled: {
            id: 1,
            firstName: 'Nahuel',
            lastName: 'Fons',
            englishLevel: 'B1',
            role: 'ADMIN',
            email: 'nahuelfons@gmail.com',
            createdAt: new Date()

        }
    }  
]

@Injectable({ providedIn: 'root' })
export class InscriptionsService {
  private inscriptionsSubject = new BehaviorSubject<IInscription[]>(INSCRIPTIONS_DB);

  getInscriptions(): Observable<IInscription[]> {
    return this.inscriptionsSubject.asObservable();
  }

  createInscriptions(data: ICreateInscriptionData) {
    if (data.enrolled && data.course) {
      const newInscription: IInscription = {
        id: new Date().getTime(),
        enrolled: data.enrolled,
        course: data.course,
      };
    INSCRIPTIONS_DB.push(newInscription);
      this.inscriptionsSubject.next([...INSCRIPTIONS_DB]);
    }
    return this.inscriptionsSubject.asObservable();
  }

    deleteInscription(id: number): Observable<IInscription[]> {
        INSCRIPTIONS_DB = INSCRIPTIONS_DB.filter((inscription) => inscription.id !== id);
        return of(INSCRIPTIONS_DB)
    }

    updateInscription(id: number, data: IInscription) {
        return of (INSCRIPTIONS_DB.map((inscription) => inscription.id === id ? { ...inscription, ...data} : inscription ))
    }

}
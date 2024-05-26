import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { InscriptionsService } from '../inscriptions.service';


@Injectable()
export class InscriptionEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionService.getInscriptions().pipe(
          map(data => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.createInscriptions),
      switchMap(({ payload }) => {
        return this.inscriptionService.createInscription(payload).pipe(
          map((newInscription) => {
            return InscriptionActions.createInscriptionsSuccess({ data: newInscription });
          }),
          catchError((error) => {
            return of(InscriptionActions.createInscriptionsFailure({ error }));
          })
        );
      })
    );
  });

  deleteInscriptionById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.deleteInscriptionsById),
      concatMap(( action ) =>
        this.inscriptionService.deleteInscriptionById(action.id).pipe(
          map(data => InscriptionActions.deleteInscriptionsByIdSuccess({ data })),
          catchError(error => of(InscriptionActions.deleteInscriptionsByIdFailure({ error })))
        )
      )
    )
  });

  constructor(private actions$: Actions, private inscriptionService: InscriptionsService) {}
}

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState = createFeatureSelector<fromInscription.State>(
  fromInscription.inscriptionFeatureKey
);

export const selectInscriptionList = createSelector(
  selectInscriptionState, 
  (s) => s.inscriptions
)

export const selectLoadingInscriptions = createSelector(
  selectInscriptionState, 
  (s) => s.loadingInscriptions
)

export const selectInscriptionsError = createSelector(
  selectInscriptionState, 
  (s) => s.error
)
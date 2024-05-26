import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { IInscription } from '../models';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  loadingInscriptions: boolean;
  inscriptions: IInscription[];
  error: unknown;
}

export const initialState: State = {
  loadingInscriptions: false,
  inscriptions: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  // Load Inscriptions
  on(InscriptionActions.loadInscriptions, (state) => {
    return {
      ...state, 
      loadingInscriptions: true,
    }
  }), 
  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state, 
      inscriptions: action.data,
      loadingInscriptions: false,
    }
  }),
  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingInscriptions: false,
    }
  }),
  // Create Inscriptions
  on(InscriptionActions.createInscriptions, (state) => {
    return {
    ...state,
    loadingInscriptions: true,
    }
  }),
  on(InscriptionActions.createInscriptionsSuccess, (state, action) => {
    return {
    ...state,
    inscriptions: [...state.inscriptions, action.data],
    loadingInscriptions: false,
    }
  }),
  on(InscriptionActions.createInscriptionsFailure, (state, action) => {
    return {
    ...state,
    error: action.error,
    loadingInscriptions: false,
    }
  }),
  // Delete Inscriptions
  on(InscriptionActions.deleteInscriptionsById, (state) => {
    return {
      ...state, 
      loadingInscriptions: true,
    }
  }),
  on(InscriptionActions.deleteInscriptionsByIdSuccess, (state, action) => {
    return {
      ...state, 
      inscriptions: state.inscriptions.filter(inscription => inscription.id != action.data.id),
      loadingInscriptions: false,
    }
  }),
  on(InscriptionActions.deleteInscriptionsByIdFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingInscriptions: false,
    }
  }),

);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});
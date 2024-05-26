import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateInscriptionPayload, IInscription } from '../models';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: IInscription[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),

    'Create Inscriptions': props<{ payload: ICreateInscriptionPayload }>(),
    'Create Inscriptions Success': props<{ data: IInscription }>(),
    'Create Inscriptions Failure': props<{ error: unknown }>(),

    'Delete Inscriptions By Id': props<{ id: string }>(),
    'Delete Inscriptions By Id Success': props<{ data: IInscription }>(),
    'Delete Inscriptions By Id Failure': props<{ error: unknown }>(),
  }
});

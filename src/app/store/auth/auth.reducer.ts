import { createReducer, on } from "@ngrx/store";
import { IUsers } from "../../layouts/dashboard/pages/users/models";
import { authActions } from "./auth.actions";

export interface AuthState {
    authUser: null | IUsers;
}

const initialState: AuthState = {
    authUser: null,
}

const MOCK_AUTH_USER: IUsers = {
    id: 1,
    firstName: 'Nahuel',
    lastName: 'Fons',
    englishLevel: 'C2',
    email: 'nahuelfons@gmai.com',
    role: 'ADMIN',
    createdAt: new Date(),
}

export const authFeatureName = 'auth';

export const authReducer = createReducer(initialState,
    on(authActions.login, (state, action) => {

        if (action.payload.email !== 'nahuelfons@gmail.com' || action.payload.password !== '123123') {
            alert('Correo o password incorrectos')
            return state;
          } else {
            localStorage.setItem('accessToken', '54736587347482')
          }
          return {
            authUser: MOCK_AUTH_USER
          }
    }),

    on(authActions.logout, () => {
      localStorage.removeItem('accessToken');  
      return initialState
    })
)


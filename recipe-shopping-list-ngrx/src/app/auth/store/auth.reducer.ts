import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import * as AuthActions from './auth.actions';

export interface AuthState {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: AuthState = {
    user: null as any,
    authError: null as any,
    loading: false
}

export const authReducer = createReducer(
        initialState,
        on(AuthActions.authenticateSuccess, (state, { email, userId, token, expirationDate } ) => ({
            ...state, 
            user: new User(email, userId, token, expirationDate),
            authError: null as any,
            loading: false
        })),
        on(AuthActions.logout, (state) => ({
            ...state, 
            user: null as any,
            authError: null as any,
            loading: false
        })),
        on(AuthActions.loginStart, AuthActions.signupStart, (state) => ({
            ...state,
            authError: null as any,
            loading: true
        })),
        on(AuthActions.authenticateFail, (state, { payload } ) => ({
            ...state,
            user: null as any,  
            authError: payload,
            loading: false
        })),
        on(AuthActions.clearError, (state) => ({
            ...state,
            authError: null as any
        }))
    );
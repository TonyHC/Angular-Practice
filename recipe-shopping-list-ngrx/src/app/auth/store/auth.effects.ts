import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment.prod';
import { of } from 'rxjs/internal/observable/of';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
  const expirationDate = new Date(
    new Date().getTime() + expiresIn * 1000
  );

  const user = new User(email, userId, token, expirationDate);

  localStorage.setItem('userData', JSON.stringify(user));

  // This action automatically gets dispatched by NgRx effects
  return AuthActions.authenticateSuccess({ 
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
}

const handleError = (errorResponse: any) => {
  let errorMessage = 'An unknown error occurred!';

  if (!errorResponse.error || !errorResponse.error.error) {
    return of(AuthActions.authenticateFail({ payload: errorMessage }));
  }

  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
        errorMessage = 'Invalid email or password';
        break;
  }

  return of(AuthActions.authenticateFail({ payload: errorMessage }));
}

@Injectable()
export class AuthEffects {
  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((authData) => {
          return this.http.post<AuthResponsePayload>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, 
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => { 
              // Map returns wrapped code as an observable
              return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
            }),
            catchError((errorRes) => {
              // Create and return non-error observable
              return handleError(errorRes);
            })
          );
      })
    )
  );

  // An effect by default should dispatch new action (ongoing observable shouldn't receive an error)
  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      // Continue from this observable chain if action reacting to is type loginStart
      ofType(AuthActions.loginStart),
      switchMap((authData) => {
        return this.http
          .post<AuthResponsePayload>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              // Map returns wrapped code as an observable
              return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
            }),
            catchError((errorRes) => {
              // Create and return non-error observable
              return handleError(errorRes);
            })
          );
      })
    )
  );

  autoLogin = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.autoLogin),
        map(() => {
          const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') as string);
        if (!userData) {
          return {type: 'Dummy'};
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.authService.setLogoutTimer(expirationDuration);

            // Dispatch the login action
            return AuthActions.authenticateSuccess(
                {
                    email: loadedUser.email, 
                    userId: loadedUser.id, 
                    token: loadedUser.token, 
                    expirationDate: new Date(userData._tokenExpirationDate), 
                    redirect: false
                }
            );
        }

        return {type: 'Dummy'};
        })
      )
  );

  authLogout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ), {dispatch: false}
  );

  // Non-dispatching effect
  authSuccess = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap((authSuccessAction) => {
            if (authSuccessAction.redirect) {
              this.router.navigate(['/']);
            }
        })
      ), {dispatch: false}
  );
  
constructor(
      private actions$: Actions, 
      private http: HttpClient,
      private router: Router,
      private authService: AuthService) {}
}

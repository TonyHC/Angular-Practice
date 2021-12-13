import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponsePayload {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    /* 
    * BehaviorSubject has same functionality as Subject but gives subscribers immeidate access to previously 
    * emmited value even if they haven't subscribed at the point of time that value was emitted
    */
    user = new BehaviorSubject<User>(null as any);
    private tokenExiprationTime: any;

    constructor(private http: HttpClient, private router: Router) {

    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponsePayload>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwN6zpMwrvHmdhUCcDMBeqy7mV-0n9-m4', 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), 
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            }
        ));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponsePayload>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwN6zpMwrvHmdhUCcDMBeqy7mV-0n9-m4',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            }
        ));
    }

    logout() {
        this.user.next(null as any);
        this.router.navigate(['/auth']);

        // Clear userData from local storage
        localStorage.removeItem('userData');

        // If user clicks logout button before token expires after 1 hour, we clear the timer to auto logout the user after 1 hour
        if (this.tokenExiprationTime) {
            clearTimeout(this.tokenExiprationTime);
        }

        this.tokenExiprationTime = null;
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') as string);
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);

            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) { // exiprationDuration in ms
        console.log(expirationDuration);
        this.tokenExiprationTime = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);

        // Store the user data in local storage within the browser
        localStorage.setItem('userData', JSON.stringify(user));
    }


    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (!errorResponse.error || !errorResponse.error.error) {
            throwError(() => new Error(errorMessage));
        }

        switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid email or password';
                break;

        }

        return throwError(() => new Error(errorMessage));
    }
}
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app-reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenExiprationTime: any;

    constructor(private store: Store<fromApp.AppState>) {

    }

    setLogoutTimer(expirationDuration: number) { // exiprationDuration in ms
        console.log(expirationDuration);
        this.tokenExiprationTime = setTimeout(() => {
            this.store.dispatch(AuthActions.logout());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExiprationTime) {
            clearTimeout(this.tokenExiprationTime);
            this.tokenExiprationTime = null;
        }
    }
}
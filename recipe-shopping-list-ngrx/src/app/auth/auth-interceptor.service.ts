import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take, exhaustMap, map } from "rxjs/operators"
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app-reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /* 
        * take(): retrieved the emit value from subscription x times and then unsubscribe afterwards
        * exhauseMap(): Get the data (value) from previous observable, then return new observable and 
        * replace previous observable with the inner chain observable
        * When we login successfully (authenticated) and try to fetch data from Firebase, a token is required to do so.
        * We get access to this token through the behavior of BehaviorSubject (only apply to valid users)
        */
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }

                const modifiedRequest = req.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modifiedRequest);
            })
        );
    }
}
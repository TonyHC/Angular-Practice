import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import * as fromApp from '../store/app-reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;

    private authSubscription!: Subscription;


    constructor(private store: Store<fromApp.AppState>) {

    }

    ngOnInit(): void {
        this.authSubscription = this.store.select('auth').pipe(
            map(authState => {
                return authState.user;
            })
        ).subscribe(user => {
            this.isAuthenticated = !user ? false : true; // equaivalent to !!user
        });
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    onSaveRecipes() {
        this.store.dispatch(RecipeActions.storeRecipes());
    }

    onFetchRecipes() {
        this.store.dispatch(RecipeActions.fetchRecipes());
    }

    onLogout() {
        this.store.dispatch(AuthActions.logout());
    }
}
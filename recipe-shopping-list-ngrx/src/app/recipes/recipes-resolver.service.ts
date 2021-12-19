import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Recipe } from "./recipe.model";
import * as fromApp from '../store/app-reducer';
import * as RecipeActions from './store/recipe.actions';
import { Actions, ofType } from "@ngrx/effects";
import { take, map, switchMap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private store: Store<fromApp.AppState>,
        private actions$: Actions) {

    }

    resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.store.select('recipes').pipe(
            take(1),
            map((recipeState) => {
                return recipeState.recipes;
            }),
            switchMap((recipes) => {
                // If we currently have no recipes once we visit a route(s) with the resolve guard, 
                // then fetch the recipes from the backend service (to prevent a bug when accessing the recipe details/edit route, won't load the list of recipes)
                if (recipes.length === 0) {
                    this.store.dispatch(RecipeActions.fetchRecipes());

                    return this.actions$.pipe(
                        ofType(RecipeActions.SET_RECIPES),
                        take(1)
                );
                } else {
                    // Otherwise, return the list of returns (already fetched)
                    return of(recipes);
                }
            })
        );
    }
}
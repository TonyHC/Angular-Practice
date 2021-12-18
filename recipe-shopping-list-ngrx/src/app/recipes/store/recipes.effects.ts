import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app-reducer';

@Injectable()
export class RecipeEffects {
    fetchRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipeActions.fetchRecipes),
            switchMap(() => {
                return this.http.get<Recipe[]>('https://recipe-shopping-list-cee08-default-rtdb.firebaseio.com/recipes.json');
            }),
            map(recipes => { // Transform each recipe ingredient's array from the array of recipes
                return recipes.map(recipe => { // Apply a callback function to each recipe in recipes array
                    /* 
                    * If the recipe's ingredients is null (never added ingredients), 
                    * then set the ingredients array as empty array to avoid potential bugs when we save and fetch the recipes
                    * Otherwise, if the recipe's ingredients is not null (empty array or array of recipes), 
                    * then we use the same ingredients array
                    */
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                });
            }),
            map(recipes => {
                return RecipeActions.setRecipes({payload: recipes});
            })
        )
    );

    storeRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipeActions.storeRecipes),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipeState]) => {
                return  this.http.put<Recipe[]>('https://recipe-shopping-list-cee08-default-rtdb.firebaseio.com/recipes.json', recipeState.recipes);
            })
        ), {dispatch: false}
    );

    constructor(private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>) {}
}
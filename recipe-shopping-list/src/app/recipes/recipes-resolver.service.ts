import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService,
        private recipeService: RecipeService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();

        // If we currently have no recipes once we visit a route(s) with the resolve guard, 
        // then fetch the recipes from the backend service (to prevent a bug when accessing the recipe details/edit route, won't load the list of recipes)
        if (recipes.length === 0) {
            // We don't need to subscribe to fetchRecipes() because the resolve guard handles it for you
            return this.dataStorageService.fetchRecipes();
        } else { // Otherwise, return the list of returns
            return recipes;
        }
    }
}
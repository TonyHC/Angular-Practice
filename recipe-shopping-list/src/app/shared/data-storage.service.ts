import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

// Inject HttpService into this service
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {

    }

    saveRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put<Recipe[]>('https://recipe-shopping-list-cee08-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://recipe-shopping-list-cee08-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipes => { // Transform each recipe ingredient's array from the array of recipes
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
            tap(recipes => { // Execute some code without altering the data being funneled through the observable
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}
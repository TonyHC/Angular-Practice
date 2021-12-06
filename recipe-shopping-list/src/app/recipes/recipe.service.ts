import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe("Pancake", "Pancakes with raspberries", 
            "https://2aj47i3u0emv3rfnwz2zoyfm-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/pixabay.jpg",
            [
                new Ingredient("Eggs", 3),
                new Ingredient("Milk", 1),
                new Ingredient("Butter", 1),
                new Ingredient("Raspberries", 4)
            ]),
        new Recipe("Spinach Pizza", "Baked spinach pizza", 
            "https://2aj47i3u0emv3rfnwz2zoyfm-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/iso-republic.jpg",
            [
                new Ingredient("Tomatoes", 3),
                new Ingredient("Spinach", 10),
                new Ingredient("Pizza dough", 1)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {

    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}
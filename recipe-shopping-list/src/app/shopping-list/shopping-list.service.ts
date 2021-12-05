import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient("Yellow Potatoes", 2),
        new Ingredient("Carrots", 4)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients);
    }

    addIngredients(ingredients: Ingredient[]) {
        for (let ingredient of ingredients) {
            if (!this.ingredients.includes(ingredient)) {
                this.ingredients.push(ingredient);
            } 
        } 

        // (...): spread operator to access all ingredients from parameter and push to ingredient array in service
        // this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients);
    }

}
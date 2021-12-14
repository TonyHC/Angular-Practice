import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient("Yellow Potatoes", 2),
        new Ingredient("Carrots", 4)
    ];

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients);
    }

    addIngredients(ingredients: Ingredient[]) {
        for (let ingredient of ingredients) {
            if (this.ingredients.indexOf(ingredient) == -1) {
                this.ingredients.push(ingredient);
            } 
        } 

        // (...): spread operator to access all ingredients from parameter and push to ingredient array in service
        // this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients);
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
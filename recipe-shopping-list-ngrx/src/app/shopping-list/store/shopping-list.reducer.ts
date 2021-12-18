import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient("Yellow Potatoes", 2),
        new Ingredient("Carrots", 4)
    ],
    editedIngredient: null as any,
    editedIngredientIndex: -1
};

/* 
 * Create Reducer in NgRx v7.x and prior
    export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient): ShoppingListState {
        switch(action.type) {
            case ShoppingListActions.ADD_INGREDIENT:
                return {
                    // Copies all properties from initial state using spread operator
                    ...state,
                    ingredients: [...state.ingredients, action.payload]
                };
        }
    } 
*/

// Create Reducer in NgRx v8 and higher
export const shoppingListReducer = createReducer(
        initialState,
        on(ShoppingListActions.addIngredient, (state, { payload } ) => ({
            ...state, 
            ingredients: [...state.ingredients, payload]
        })),
        on(ShoppingListActions.addIngredients, (state, { payload } ) => ({
            ...state, 
            ingredients: [...state.ingredients, ...state.ingredients]
        })),
        on(ShoppingListActions.updateIngredient, (state, { payload } ) => ({
            ...state, 
            ingredients: state.ingredients.map((ingredient, index) => 
                index === state.editedIngredientIndex ? payload : ingredient),
            editedIngredient: null as any,
            editedIngredientIndex: -1
        })),
        on(ShoppingListActions.deleteIngredient, (state) => ({
            ...state, 
            ingredients: state.ingredients.filter((ingredient, ingredientIndex) => {
                return ingredientIndex !== state.editedIngredientIndex;
            }),
            editedIngredient: null as any,
            editedIngredientIndex: -1
        })),
        on(ShoppingListActions.startEdit, (state, { payload } ) => ({
            ...state, 
            editedIngredientIndex: payload, 
            editedIngredient: {...state.ingredients[payload]}
        })),
        on(ShoppingListActions.stopEdit, (state) => ({
           ...state,
           editedIngredient: null as any,
           editedIngredientIndex: -1 
        }))
    );

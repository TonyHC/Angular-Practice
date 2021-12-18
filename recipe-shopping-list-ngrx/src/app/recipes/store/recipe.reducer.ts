import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions';

export interface RecipesState {
    recipes: Recipe[];
}

const initialState: RecipesState = {
    recipes: []
}

export const recipesReducer = createReducer(
    initialState,
    on(RecipeActions.setRecipes, (state, { payload } ) => ({
        ...state, 
        recipes: [...payload]
    })),
    on(RecipeActions.addRecipe, (state, { payload } ) => ({
        ...state,
        recipes: [...state.recipes, payload]
    })),
    on(RecipeActions.updateRecipe, (state, { payload } ) => ({
        ...state,
        recipes: state.recipes.map((recipe, index) => 
            index === payload.index ? payload.recipe : recipe
        )
    })),
    on(RecipeActions.deleteRecipe, (state, { payload } ) => ({
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
            return index !== payload;
        })
    }))
);

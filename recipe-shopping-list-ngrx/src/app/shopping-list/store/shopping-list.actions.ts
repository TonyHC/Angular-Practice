import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping ist] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping ist] Add Ingreients';
export const UPDATE_INGREDIENT = '[Shopping ist] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping ist] Delete Ingreient';
export const START_EDIT = '[Shopping ist] Start Edit';
export const STOP_EDIT = '[Shopping ist] Stop Edit';

/* 
* Create Action in NgRx v7.x and prior
    export class AddIngredient implements Action {
        readonly type = ADD_INGREDIENT;
        constructor(public payload: Ingredient) {}
    } 
*/

// Create Action in NgRx v8 and higher
export const addIngredient = createAction(ADD_INGREDIENT, props<{payload: Ingredient}>());
export const addIngredients = createAction(ADD_INGREDIENTS, props<{payload: Ingredient[]}>());
export const updateIngredient = createAction(UPDATE_INGREDIENT, props<{payload: Ingredient}>());
export const deleteIngredient = createAction(DELETE_INGREDIENT);
export const startEdit = createAction(START_EDIT, props<{payload: number}>());
export const stopEdit = createAction(STOP_EDIT);
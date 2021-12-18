import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app-reducer';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;

  private storeSubscription!: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.editMode = params["id"] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImageURL = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSubscription = this.store.select('recipes').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index == this.id;
          });
        })
      ).subscribe(recipe => {
        recipeName = recipe!.name;
        recipeImageURL = recipe!.imagePath;
        recipeDescription = recipe!.description;
  
        if (recipe!['ingredients']) {
          for (let ingredient of recipe!.ingredients) {
            recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImageURL, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onSubmit() {
    /* const newRecipe = new Recipe(this.recipeForm.value.name, 
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value['ingredients']); */

    if (this.editMode) {
      this.store.dispatch(RecipeActions.updateRecipe({payload: {index: this.id, recipe: this.recipeForm.value}}));
    } else {
      this.store.dispatch(RecipeActions.addRecipe({payload: this.recipeForm.value}));
    }

    this.onCancel();
  }

  onClear() {
    this.recipeForm.reset();
  }

  onCancel() {
    this.router.navigate(["../"], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onClearIngredients() {
    (this.recipeForm.get('ingredients') as FormArray).clear();
  }

  isRecipeIngredientsEmpty(): boolean {
    console.log((this.recipeForm.get('ingredients') as FormArray).controls.length);
    return (this.recipeForm.get('ingredients') as FormArray).controls.length === 0;
  }
}

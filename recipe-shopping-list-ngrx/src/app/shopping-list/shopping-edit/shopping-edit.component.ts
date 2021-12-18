import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app-reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f')
  shoppingListForm!: NgForm;

  subscription!: Subscription;
  editMode = false;
  editedItem!: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;

        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onSubmitItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
  
    if (this.editMode) {
      // Dispatch the updateIngredient action
      this.store.dispatch(ShoppingListActions.updateIngredient({payload: newIngredient}));
    } else {
      // Dispatch the addIngredient action
      this.store.dispatch(ShoppingListActions.addIngredient({payload: newIngredient}));
    }

    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onResetForm() {
    this.shoppingListForm.reset();
    this.editMode = false;

    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onDeleteItem() {
    // Dispatch the deleteIngredient action
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    
    this.onResetForm();
  }
}

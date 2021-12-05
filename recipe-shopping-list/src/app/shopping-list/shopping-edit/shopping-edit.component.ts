import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", {static: true})
  inputName!: ElementRef;

  @ViewChild("amountInput", {static: true})
  inputAmount!: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnInit(): void {
  }

  onAddIngredient() {
    const ingredientName = this.inputName.nativeElement.value;
    const ingredientAmount = this.inputAmount.nativeElement.value;
    const ingredient = new Ingredient(ingredientName, ingredientAmount);
  
    this.shoppingListService.addIngredient(ingredient);
  }
}

import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output()
  createdIngredient = new EventEmitter<Ingredient>();

  @ViewChild("nameInput", {static: true})
  inputName!: ElementRef;

  @ViewChild("amountInput", {static: true})
  inputAmount!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient() {
    const ingredientName = this.inputName.nativeElement.value;
    const ingredientAmount = this.inputAmount.nativeElement.value;
    const ingredient = new Ingredient(ingredientName, ingredientAmount);
    this.createdIngredient.emit(ingredient);
  }
}

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRouteModule } from "./shopping-list-router.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:
    [
        ShoppingListComponent, 
        ShoppingEditComponent
    ],
    imports: 
    [
        FormsModule,
        ShoppingListRouteModule,
        SharedModule
    ]
})
export class ShoppingListModule { }
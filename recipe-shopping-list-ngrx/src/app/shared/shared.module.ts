import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponenet } from "./alert/alert.component";
import { DropDownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations: [
        AlertComponenet,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropDownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponenet,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropDownDirective,
        CommonModule
    ]
})
export class SharedModule {}
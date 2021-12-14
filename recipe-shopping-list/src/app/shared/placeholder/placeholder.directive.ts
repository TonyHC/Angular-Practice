import { Directive, ViewContainerRef } from "@angular/core";

// Custom Attribute Directive
@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
    // ViewContainterRef gives you a pointer to where this directive was used
    constructor(public viewContainterRef: ViewContainerRef) {

    }
}
import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

// Custom Attribute Directive: Close a dropdown menu either by clicking on the dropdown menu or anywhere outside
@Directive({
    selector: "[appDropDown]"
})
export class DropDownDirective {
    @HostBinding("class.open")
    isOpen = false;

    @HostListener("document:click", ["$event"])
    toggleOpen(event: Event) {
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    constructor(private elementRef: ElementRef) {

    }
}
import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

// Custom Attribute Directive
@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  // Custom Directive Properties
  @Input()
  defaultColor: string = "transparent";

  @Input("appBetterHighlight")
  highlightColor: string = "violet";

  // Define which property of the hosting element we want to bind
  @HostBinding("style.backgroundColor")
  backgroundColor!: string;

  constructor(private elementRef: ElementRef, private render: Renderer2) { 

  }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;

    // Better practice to use Render2 for any DOM manipulations
    /* this.render.setStyle(this.elementRef.nativeElement, "background-color", "violet") */
  }

  // HostListener used to react to any events
  @HostListener("mouseenter")
  mouseOver(eventData: Event) {
    /* this.render.setStyle(this.elementRef.nativeElement, "background-color", "violet") */
    this.backgroundColor = this.highlightColor;
  }

  @HostListener("mouseleave")
  mouseLeave(eventData: Event) {
    /* this.render.setStyle(this.elementRef.nativeElement, "background-color", "transparent") */
    this.backgroundColor = this.defaultColor;
  }
}

import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None, ShadowDom (Emulated Default)
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, 
      AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  // Custom Property with alias that bindable to any parent component
  @Input("srvElement")
  element!: { type: string; name: string; content: string; };

  @Input()
  name!: string;

  @ViewChild("heading", {static: true})
  header!: ElementRef;

  // Can be apply to elements or local references from parent component to access Template or DOM through <ng-content>
  // Elements or local references that we know the parent component passed to child component
  @ContentChild("contentParagraph", {static: true})
  paragraph!: ElementRef;

  constructor() { 
    console.log("constructor called");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called");
    console.log(changes);
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
    // Empty string for content
    console.log("Text Content: " + this.header.nativeElement.textContent);
    console.log("Text Content of paragraph: " + this.paragraph.nativeElement.textContent);
  }

  ngDoCheck() {
    console.log("ngDoCheck called");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit called");
    console.log("Text Content of paragraph: " + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit called");
    console.log("Text Content: " + this.header.nativeElement.textContent);
    console.log(this.header);
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy called");
  }
}

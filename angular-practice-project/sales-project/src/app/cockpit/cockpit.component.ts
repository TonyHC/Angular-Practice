import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // Custom Events that are bindable to any parent component (emit events)
  @Output()
  serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output("bpCreated")
  blueprintCreated = new EventEmitter<{blueprintName: string, blueprintContent: string}>();

  // newServerName = '';
  // newServerContent = '';

  /* 
   * @ViewChild can be apply to elements or local references to access Template or DOM
   * The same change (add { static: true } as a second argument) needs to be applied to ALL usages of @ViewChild() 
   * IF you plan on accessing the selected element inside of ngOnInit().
   * If you DON'T access the selected element in ngOnInit (but anywhere else in your component), set static: false instead!
   * If you're using Angular 9+, you only need to add { static: true } (if needed) but not { static: false }.  
  */
  @ViewChild("serverContentInput", {static: true})
  serverContentInput!: ElementRef;
  
  constructor() { }

  // Lifecycle hook: called once the component is initialiezd
  ngOnInit(): void {
  }

  // Emits the serverCreated event
  onAddServer(serverNameInput: HTMLInputElement) {
    console.log(serverNameInput);
    this.serverCreated.emit({
      serverName: serverNameInput.value,
      // Access the local reference (or element) value
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  // Emits the blueprintCreated event
  onAddBlueprint(blueprintNameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      blueprintName: blueprintNameInput.value,
      blueprintContent: this.serverContentInput.nativeElement.value
    })
  }
}

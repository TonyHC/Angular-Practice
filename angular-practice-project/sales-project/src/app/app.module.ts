import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { GameControlComponent } from './game-control/game-control.component';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight-directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { UnlessDirective } from './unless/unless.directive';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountService } from './services/account.service';
import { LoggingService } from './services/logging.service';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { CounterService } from './services/counter.service';

@NgModule({
  declarations: [
    AppComponent,
    SalesPersonListComponent,
    CockpitComponent,
    ServerElementComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    AccountComponent,
    NewAccountComponent,
    ActiveUsersComponent,
    InactiveUsersComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  /*  
   * The services specific in the providers array all share the same instance for each component that make uses
   * of these services through dependency injection. If a component wants a new (separate) instance of these services,
   * you can override these services by specificing the service in the providers array of the component 
  */
  providers: [AccountService, LoggingService, CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

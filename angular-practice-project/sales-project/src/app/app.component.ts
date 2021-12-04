import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { UserService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  quarterDate = "January";
  title = 'User Sales';

  serverElements = [{type: "server", name: "Test", content: "Testing"}];

  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  accounts: {name: string, status: string}[] = [];

  constructor(private accountService: AccountService) {

  }

  ngOnInit() {
    this.accounts = this.accountService.accounts;
  }

  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    }); 
  }
    
  onBlueprintAdded(blueprintData: {blueprintName: string, blueprintContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.blueprintName,
      content: blueprintData.blueprintContent
    }); 
  }

  onIntervalFired(firedNumber: number) {
    if(firedNumber % 2 == 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }

  onChangeFirst() {
    this.serverElements[0].name = "Changed";
  }

  onDestroyFirst() {
    this.serverElements.splice(0,1);
  }

  getQuarterDate() {
    return this.quarterDate;
  }

}

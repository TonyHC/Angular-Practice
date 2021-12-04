import { Component, Input } from '@angular/core';
import { AccountService } from '../services/account.service';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() 
  account!: {name: string, status: string};

  @Input() 
  id!: number;
  
  // Dependency Injection: Inject the Logging Service (creates a instance of LoggingService class)
  constructor(private loggingService: LoggingService,
      private accountService: AccountService) {

  }

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    // this.loggingService.logStatusChange(status);
    this.accountService.statusUpate.emit(status);
  }
}

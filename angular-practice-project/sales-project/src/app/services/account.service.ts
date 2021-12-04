import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

// Only apply @Injectable to a service if plan to inject something into it (dependency injection)
@Injectable()
export class AccountService {
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
    ];

    /* 
    * Cross Component Communication in a Service: 
    * Instead of chaining multiple @Output EventEmitters through several components, we can define in a
    * Service a centralized EventEmitter the components can make use of
    */
    statusUpate = new EventEmitter<string>();

    // Inject Logging Service into Account Service (inect service into another service)
    constructor(private loggingService: LoggingService) {

    }

    addAccount(name: string, status: string) {
      this.loggingService.logStatusChange(status);
      this.accounts.push({name: name, status: status});
    }

    updateStatus(id: number, status: string) {
      this.loggingService.logStatusChange(status);
      this.accounts[id].status = status;
    }
}
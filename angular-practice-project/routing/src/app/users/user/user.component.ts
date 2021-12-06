import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit() {
    // Use this approach if your component when reached gets recreated every single time
    // and theres no way to reach this component within the component
    this.user = {
      id: this.route.snapshot.parent["id"],
      name: this.route.snapshot.parent["name"]
    }

    // Only use this approach for all other cases to receive changes from route parameter(s)
    // Behind the scenes, when this component gets destroyed, Angular unsubscribes (cleans up the subscription)
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params["id"],
        this.user.name = params["name"]
      }
    );
  }

  ngOnDestroy() {
    // Manually clean up this subscription (also have to do this for custom observables)
    this.paramSubscription.unsubscribe();
  }

}

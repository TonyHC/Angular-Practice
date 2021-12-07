import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    /* this.firstObservableSubscription = interval(1000).subscribe(
      count => {
        console.log(count);
      }
    ); */

    // Custom Observable 
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count == 5) {
          observer.complete();
        }
        
        if (count > 3) {
          observer.error(new Error("Count is greater than 3!"));
        }

        count++;
      }, 1000);
    });

    // Reactively handle the data, error and completion of the custom Observable
    // Use map() operator to transform the data before retrieved by the subscription
    // Use filter() operator to filter out data. If its true chain (or propogate) downwards, else don't chain downwards
    this.firstObservableSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return "Round: " + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message)
    }, () => {
      console.log("Completed!");
    });
  }

  ngOnDestroy() {
    this.firstObservableSubscription.unsubscribe();
  }
}

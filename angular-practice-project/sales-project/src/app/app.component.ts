import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quarterDate = "January";
  title = 'User Sales';

  getQuarterDate() {
    return this.quarterDate;
  }
}

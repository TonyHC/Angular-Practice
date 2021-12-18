import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app-reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-shopping-list';

  constructor(private store: Store<fromApp.AppState>) {

  }

  ngOnInit(): void {
    // Always stay login even if we refresh the page unless the token expires after 1 hour
    this.store.dispatch(AuthActions.autoLogin());
  }
}

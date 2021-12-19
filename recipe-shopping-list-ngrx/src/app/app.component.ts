import { Component, Inject, InjectionToken, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app-reducer';
import * as AuthActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-shopping-list';

  constructor(private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>) {

  }

  ngOnInit(): void {
    // Apply this check if working with Browser API such as localStorage
    if (isPlatformBrowser(this.platformId)) {
      // Always stay login even if we refresh the page unless the token expires after 1 hour
      this.store.dispatch(AuthActions.autoLogin());
    }
  }
}

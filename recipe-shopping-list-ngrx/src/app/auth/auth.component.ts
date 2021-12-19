import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponenet } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app-reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error : string = "";

  closeSubscription!: Subscription;
  storeSubscription!: Subscription;

  // Finds the occurence of this directive
  @ViewChild(PlaceholderDirective)
  alertHost!: PlaceholderDirective;

  constructor(private store: Store<fromApp.AppState>) { 

  }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;

      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
      // Dispatch the login start action
      this.store.dispatch(AuthActions.loginStart({payload: {email: email, password: password}}));
    } else {
      // Dispatch the signup start action
      this.store.dispatch(AuthActions.signupStart({payload: {email: email, password: password}}));
    }

    form.reset();
  }

  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
  }

  private showErrorAlert(message: string) {
    // Dynamically create and render a component programmatically  
    const hostViewContainerRef = this.alertHost.viewContainterRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponenet);

    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }

    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}

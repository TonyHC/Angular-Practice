import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-shopping-list';

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    // Always stay login even if we refresh the page unless the token expires after 1 hour
    this.authService.autoLogin();
  }
}

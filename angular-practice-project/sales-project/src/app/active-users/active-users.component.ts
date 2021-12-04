import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  activeUsers: any[] = [];

  constructor(private userService: UserService) { 
    this.activeUsers = this.userService.activeUsers;
  }

  ngOnInit(): void {
  }

  onSetInactive(id: number) {
    this.userService.setToInactive(id);
  }
}

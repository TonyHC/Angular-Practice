import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  inactiveUsers: any[] = [];

  constructor(private userService: UserService) { 
    this.inactiveUsers = this.userService.inactiveUsers;
  }

  ngOnInit(): void {
  }

  onSetActive(id: number) {
    this.userService.setToActive(id);
    
  }
}

import { User } from './../../models/user.model';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'opt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userList: User[] = [];
  userValue: User | null = null;
  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUserList()
  }

  private getUserList(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      if (users && users.length > 0) {
        this.userList = users;
      }
    })
  }

  getUpdatedUser(formSubmitFlag: boolean): void {
    if (formSubmitFlag) {
      this.getUserList();
    }
  }

  onEditUser(event: User) {
    this.userValue = event;
  }

}

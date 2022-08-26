import { User } from './../../models/user.model';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserViewComponent } from '../user-view/user-view.component';

@Component({
  selector: 'opt-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {
  @Input() userList: User[] = [];
  @Output() getUpdatedValue: EventEmitter<boolean> = new EventEmitter(false);
  @Output() onEdit: EventEmitter<User> = new EventEmitter();
  constructor(
    private userService: UsersService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  onEditUser(user: User): void {
    this.onEdit.emit(user);
  }

  onDeleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe((deleteResult) => {
      console.log(`Delete successfully `, deleteResult);
      this.getUpdatedValue.emit(true);
    })
  }

  onViewUser(user: User): void {
    this.dialog.open(UserViewComponent, {
      data: user,
      width: '500px'
    });
  }
}

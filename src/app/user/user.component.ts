import { Component, OnInit } from '@angular/core';
import { UserDetailComponent } from './user-detail/user-detail.component'
import { Alert } from '../shared/alert'
import { User } from './user';
import { UserList } from './user-list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  title = 'Users';
  keyword = "";
  pageNumber = 1;
  pageSize = 10;
  alert : Alert;
  users: UserList;
  user: User;

  constructor(private usersService: UsersService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.alert = <Alert>{};
    this.users = <UserList>{};
    this.find();
  }

  pageChange(page: number) {
    this.pageNumber = page;
    this.find();
  }
  
  find() {
    this.usersService.find<UserList>(this.keyword, this.pageNumber, this.pageSize).subscribe(
      users => {
        this.users = users;
      },
      errorResponse => {
        this.alert.errorMessage = errorResponse.error.Message;
      });
  }

  reloadItems($event: any) {
    this.user = null;
    this.alert = $event.alert;
    this.find();
  }

  add() {
    this.user = <User>{};
    const modal = this.modalService.open(UserDetailComponent, {
      size: 'lg', windowClass: 'modal-bottom-right', backdrop: 'static', keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
    modal.componentInstance.user = this.user;
    modal.componentInstance.reloadItems.subscribe(($event) => {
      this.alert = $event.alert;
    });
  }

  select(user: User) {
    this.alert = <Alert>{};
    const modal = this.modalService.open(UserDetailComponent, {
      size: 'lg', windowClass: 'modal-bottom-right', backdrop: 'static', keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
    modal.componentInstance.user= user;
    modal.componentInstance.reloadItems.subscribe(($event) => {
      this.alert = $event.alert;
    });

    return false;
  }
}

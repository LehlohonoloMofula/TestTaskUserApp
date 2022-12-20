import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/app/shared/alert';
import { User } from '../user';
import { UsersService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .modal-bottom-right .modal-content .modal-body {
    border-radius:0;
  }}
`]
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Output() reloadItems = new EventEmitter();
  alert: Alert;
 
  constructor( private usersService: UsersService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  save() {
    this.alert = <Alert>{};
    this.usersService.save<User>(this.user).subscribe(
      user => {
        this.alert.successMessage = `User: '${this.user.name}' saved successfully.`;
        this.close();
      },
      errorResponse => {
        this.alert.errorMessage = errorResponse.error.message;
      });
  }

  close() {
    this.user = null;
    this.reloadItems.emit({ event: event, actionResult: this.alert, });
    this.modal.close("Submit");
  }

}

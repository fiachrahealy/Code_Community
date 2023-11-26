import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Message } from 'interfaces/message.interface';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { DataRefreshService } from 'services/data-refresh.service';
import { MessageService } from 'services/message.service';
import { UserService } from 'services/user.service';
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  user: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };

  recipientUser: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };

  messages: Array<Message> = [];

  newMessage: String = "";

  faTimes = faTimes;
  faPaperPlane = faPaperPlane;

  constructor(private dataRefreshService: DataRefreshService, public router: Router, private messageService: MessageService, private authService: AuthService, private userService: UserService, public dialogRef: MatDialogRef<MessagesComponent>, private ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: any) { }

  // Close Dialog

  closeDialog(): void {

    this.ngZone.run(() => {
      this.dialogRef.close();
    });

  }

  // Navigate to Profile

  navigateToProfile() {

    this.closeDialog();
    this.router.navigate(['/people/' + this.recipientUser.username]);

  }

  // Send Message

  sendMessage() {

    this.messageService.sendMessage(this.user._id, this.recipientUser._id, this.newMessage)
      .then(() => {
        this.newMessage = "";
        this.getMessages();
      })

  }

  // Get Messages

  getMessages() {

    this.messageService.getMessagesForUsers(this.user._id, this.recipientUser._id)
      .then((messages) => {
        this.messages = messages;
      })

  }

  ngOnInit(): void {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

        this.userService.getUserByID(this.data.recipientUserID)
          .then((user) => {
            this.recipientUser = user;
          });

        this.messageService.deleteUnopenedMessageRecord(this.data.recipientUserID, userID)
          .then(() => {
            this.dataRefreshService.refreshNavUser();
            this.dataRefreshService.refreshMessageUnopened();
          });

        this.messageService.getMessagesForUsers(userID, this.data.recipientUserID)
          .then((messages) => {
            this.messages = messages;
          });

      });

  }

}

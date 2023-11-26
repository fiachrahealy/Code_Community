import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { DataRefreshService } from 'services/data-refresh.service';
import { FriendService } from 'services/friend.service';
import { MessageService } from 'services/message.service';
import { MessagesComponent } from '../messages/messages.component';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  friendUsers: Array<User> = [];
  unopenedMessageUsers: Array<User> = [];

  faEnvelope = faEnvelope;
  faTimes = faTimes;

  constructor(private dataRefreshService: DataRefreshService, public dialog: MatDialog, public dialogRef: MatDialogRef<MessagesListComponent>, private ngZone: NgZone, private authService: AuthService, private messageService: MessageService, private friendService: FriendService) {

    this.dataRefreshService.navUserEvent.subscribe(value => {

      if (value === true) {
        this.pullMessageData();
      }

    });

  }

  ngOnInit(): void {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.friendService.getFriendsForUser(userID)
          .then((friends) => {
            this.friendUsers = friends;
          });

      });

    this.pullMessageData();


  }

  // Close Dialog

  closeDialog(): void {

    this.ngZone.run(() => {
      this.dialogRef.close();
    });

  }

  // Open Messages Dialog

  openMessagesDialog(recipientUserID: String) {

    const dialogRef = this.dialog.open(MessagesComponent, {

      panelClass: 'chat-dialog',
      height: '680px',
      width: '800px',
      data: {
        recipientUserID: recipientUserID
      }


    });

  }

  // Has Unopened Message

  hasUnopenedMessage(user: String): Boolean {

    for (let i = 0; i < this.unopenedMessageUsers.length; i++) {

      if (this.unopenedMessageUsers[i]._id == user) {

        return true;

      }

    }

    return false;

  }

  // Pull Message Data

  pullMessageData() {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.messageService.getUnopenedMessageUsers(userID)
          .then((users) => {
            this.unopenedMessageUsers = users;
          });

      });

  }

}

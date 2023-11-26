import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { DataRefreshService } from 'services/data-refresh.service';
import { FriendService } from 'services/friend.service';
import { UserService } from 'services/user.service';
import { MessagesComponent } from '../messages/messages.component';
import { faUserSlash, faEnvelope, faUserClock, faUserPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people: Array<User> = [];
  friendRequestUsers: Array<User> = [];
  friendUsers: Array<User> = [];
  user: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };
  i = 0;

  faUserSlash = faUserSlash;
  faEnvelope = faEnvelope;
  faUserClock = faUserClock;
  faUserPlus = faUserPlus;

  constructor(public dialog: MatDialog, private authService: AuthService, private userService: UserService, private dataRefreshService: DataRefreshService, public friendService: FriendService, private cd: ChangeDetectorRef) {

    this.dataRefreshService.peopleListEvent.subscribe(value => {

      if (value === true) {
        this.pullFriendData();

      }

    });
  }

  ngOnInit(): void {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

      });

    this.pullFriendData();

    this.userService.getAllUsers()
      .then((users) => {
        this.people = users;
      });

  }

  // Has A Sent Friend Request

  hasASentFriendRequest(user: String): Boolean {

    for (let i = 0; i < this.friendRequestUsers.length; i++) {

      if (this.friendRequestUsers[i]._id == user) {

        return true;

      }

    }

    return false;

  }

  // Open Messages Dialog

  openMessagesDialog(recipientUserID: String) {

    window.scrollTo(0, 0);

    const dialogRef = this.dialog.open(MessagesComponent, {

      panelClass: 'chat-dialog',
      height: '680px',
      width: '800px',
      data: {
        recipientUserID: recipientUserID
      }


    });

  }

  // Is Friend

  isFriend(user: String): Boolean {

    for (let i = 0; i < this.friendUsers.length; i++) {

      if (this.friendUsers[i]._id == user) {

        return true;

      }

    }

    return false;

  }

  // Pull Friend Data

  pullFriendData() {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.friendService.getFriendRequestsForSender(userID)
          .then((friendRequests) => {
            this.friendRequestUsers = friendRequests;
          });

        this.friendService.getFriendsForUser(userID)
          .then((friends) => {
            this.friendUsers = friends;
          });

      });

  }

  // Send Friend Request

  sendFriendRequest(user1: String, user2: String) {

    this.friendService.sendFriendRequest(user1, user2)
      .then(() => {
        this.pullFriendData();
      });

  }

  // Delete Friend

  deleteFriend(user1: String, user2: String) {

    this.friendService.deleteFriend(user1, user2)
      .then(() => {
        this.pullFriendData();
      });

  }

}

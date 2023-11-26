import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { DataRefreshService } from 'services/data-refresh.service';
import { FriendService } from 'services/friend.service';
import { UserService } from 'services/user.service';
import { faTimes, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-friend-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.scss']
})
export class FriendRequestListComponent implements OnInit {

  friendRequestUsers: Array<User> = [];

  user: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };

  faTimes = faTimes;
  faXmark = faXmark;
  faCheck = faCheck;

  constructor(private userService: UserService, private dataRefreshService: DataRefreshService, public dialogRef: MatDialogRef<FriendRequestListComponent>, private ngZone: NgZone, private authService: AuthService, private friendService: FriendService) { }

  ngOnInit(): void {

    this.pullFriendData();

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

      });

  }

  // Close Dialog

  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

  // Add Friend

  addFriend(user1: String, user2: String) {

    this.friendService.addFriend(user1, user2)
      .then(() => {
        this.pullFriendData();
        this.dataRefreshService.refreshPeopleList();
        this.dataRefreshService.refreshProfileFriend();
        this.dataRefreshService.refreshNavUser();
      });

  }

  // Delete Friend Request

  deleteFriendRequest(user1: String, user2: String) {

    this.friendService.deleteFriendRequest(user1, user2)
      .then(() => {
        this.pullFriendData();
        this.dataRefreshService.refreshNavUser();
      });

  }

  // Pull Friend Data

  pullFriendData() {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.friendService.getFriendRequestsForReceiver(userID)
          .then((frendRequests) => {
            this.friendRequestUsers = frendRequests;
          });

      });

  }

}

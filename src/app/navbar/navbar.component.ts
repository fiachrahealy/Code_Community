import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { UserService } from 'services/user.service';
import { FriendService } from 'services/friend.service';
import { ColourSchemeComponent } from '../colour-scheme/colour-scheme.component';
import { Router } from '@angular/router';
import { DataRefreshService } from 'services/data-refresh.service';
import { MessageService } from 'services/message.service';
import { MessagesListComponent } from '../messages-list/messages-list.component';
import { FriendRequestListComponent } from '../friend-request-list/friend-request-list.component';
import { faAddressCard, faSignOutAlt, faPaintBrush, faEnvelope, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  friendRequestUsers: Array<User> = [];
  friendUsers: Array<User> = [];
  unopenedMessageUsers: Array<User> = [];
  user: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };
  showFRNotification = false;
  showMessageNotification = false;

  faPaintBrush = faPaintBrush;
  faAddressCard = faAddressCard;
  faSignOutAlt = faSignOutAlt;
  faUserPlus = faUserPlus;
  faEnvelope = faEnvelope;
  faUser = faUser;

  constructor(private messageService: MessageService, public router: Router, private dataRefreshService: DataRefreshService, public dialog: MatDialog, public userService: UserService, public friendService: FriendService, public authService: AuthService) {

    this.dataRefreshService.navUserEvent.subscribe(value => {

      if (value === true) {
        this.pullUserData();
        this.pullFriendData();
        this.pullMessageData();
      }

    });

  }

  // Navigate to Profile

  navigateToProfile() {
    this.router.navigate(['/people/' + this.user.username]);
  }

  // Open Colour Dialog

  openColourDialog() {

    window.scrollTo(0, 0);

    const dialogRef = this.dialog.open(ColourSchemeComponent, {

      height: '300px',
      width: '400px',

    });

  }

  // Open Messages Dialog

  openMessagesDialog() {

    window.scrollTo(0, 0);

    const dialogRef = this.dialog.open(MessagesListComponent, {

      height: '408px',
      width: '400px',

    });

  }

  // Open Friend Requests Dialog

  openFRDialog() {

    window.scrollTo(0, 0);

    const dialogRef = this.dialog.open(FriendRequestListComponent, {

      height: '408px',
      width: '400px',

    });

  }

  ngOnInit() {

    if (this.authService.isLoggedIn) {

      this.pullUserData();
      this.pullFriendData();
      this.pullMessageData();

    }

    setInterval(() => {

      if (this.showFRNotification) {

        this.showFRNotification = false;
      }
      else {
        this.showFRNotification = true;
      }

    }, 600);

    setInterval(() => {

      if (this.showMessageNotification) {

        this.showMessageNotification = false;
      }
      else {
        this.showMessageNotification = true;
      }

    }, 600);

  }

  // Pull User Data

  pullUserData() {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

      });

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

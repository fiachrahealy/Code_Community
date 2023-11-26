import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'interfaces/post.interface';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { DataRefreshService } from 'services/data-refresh.service';
import { FriendService } from 'services/friend.service';
import { PostService } from 'services/post.service';
import { UserService } from 'services/user.service';
import { MessagesComponent } from '../messages/messages.component';
import { faUserPlus, faUserClock, faEnvelope, faUserSlash, faLock, faPen, faGraduationCap, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  users: Array<User> = [];
  friendRequestUsers: Array<User> = [];
  friendUsers: Array<User> = [];

  user: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };

  profileUser: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0,
  };

  posts: Array<Post> = [];

  faUserPlus = faUserPlus;
  faUserClock = faUserClock;
  faEnvelope = faEnvelope;
  faUserSlash = faUserSlash;
  faLock = faLock;
  faPen = faPen;
  faGraduationCap = faGraduationCap;
  faTrophy = faTrophy;

  constructor(private postService: PostService, public dialog: MatDialog, private authService: AuthService, private userService: UserService, private dataRefreshService: DataRefreshService, public friendService: FriendService, private route: ActivatedRoute, public router: Router, private http: HttpClient) {

    this.dataRefreshService.profileFriendEvent.subscribe(value => {

      if (value === true) {
        this.pullFriendData();
      }

    });

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

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

      });

    this.userService.getUserByUsername(this.route.snapshot.params['username'])
      .then((user) => {
        this.profileUser = user;
      });

    this.postService.getPostsForUser(this.route.snapshot.params['username'])
      .then((posts) => {
        this.posts = posts;
      });

    this.pullFriendData();

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

  // Is A Friend

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

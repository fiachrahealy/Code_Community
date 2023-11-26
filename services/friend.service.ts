import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'interfaces/user.interface';
import { UserService } from './user.service';
import { environment } from '../src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  count = 0;

  constructor(private http: HttpClient, private userService: UserService, private authService: AuthService) { }

  // Get Friend Requests For Sender

  async getFriendRequestsForSender(sender: string): Promise<User[]> {

    return new Promise<User[]>((resolve, reject) => {
      let friends: Array<User> = [];

      this.authService.getRequestToken()
        .then((token) => {
          this.http.get(environment.serverURL + '/getAllFriendRequests', {
            headers: new HttpHeaders().set('token', token)
          })
            .subscribe(
              (data) => {
                for (let i = 0; i < Object.values(data).length; i++) {
                  if (
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf('sender')
                      ]
                    ) == sender
                  ) {
                    let receiverID = String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf('receiver')
                      ]
                    );

                    this.userService
                      .getUserByID(receiverID)
                      .then((user) => {
                        friends.push(user);
                      });
                  }
                }
                resolve(friends);
              },
              (error) => {
                reject(error);
              }
            );
        });
    });
  }

  // Get Friend Requests for Receiver

  async getFriendRequestsForReceiver(receiver: string): Promise<User[]> {

    return new Promise<User[]>((resolve, reject) => {

      let friends: Array<User> = [];

      this.authService.getRequestToken()
        .then((token) => {
          this.http
            .get(environment.serverURL + '/getAllFriendRequests', {
              headers: new HttpHeaders().set('token', token),
            })
            .subscribe(
              (data) => {
                for (let i = 0; i < Object.values(data).length; i++) {
                  if (
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf('receiver')
                      ]
                    ) == receiver
                  ) {
                    let senderID = String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf('sender')
                      ]
                    );

                    this.userService
                      .getUserByID(senderID)
                      .then((user) => {
                        friends.push(user);
                      });
                  }
                }
                resolve(friends);
              },
              (error) => {
                reject(error);
              }
            );
        });
    });
  }

  // Send Friend Request

  async sendFriendRequest(sender: String, receiver: String) {

    await this.authService.getRequestToken()
      .then((token) => {
        this.http.post(environment.serverURL + '/sendFriendRequest', {
          'sender': sender,
          'receiver': receiver
        }, {
          headers: new HttpHeaders().set('token', token)
        }).toPromise();
      });
  }

  // Delete Friend Request

  async deleteFriendRequest(user1: String, user2: String) {

    await this.authService.getRequestToken()
      .then((token) => {
        this.http.post(environment.serverURL + '/deleteFriendRequest', {
          'user1': user1,
          'user2': user2
        }, {
          headers: new HttpHeaders().set('token', token)
        }).toPromise();
      });
  }

  // Add Friend

  async addFriend(user1: String, user2: String) {

    await this.authService.getRequestToken()
      .then((token) => {
        this.http.post(environment.serverURL + '/addFriend', {
          'user1': user1,
          'user2': user2
        }, {
          headers: new HttpHeaders().set('token', token)
        }).toPromise();
      });
  }

  // Delete Friend

  async deleteFriend(user1: String, user2: String) {

    await this.authService.getRequestToken()
      .then((token) => {
        this.http.post(environment.serverURL + '/deleteFriend', {
          'user1': user1,
          'user2': user2
        }, {
          headers: new HttpHeaders().set('token', token)
        }).toPromise();
      });
  }

  // Get Friends for User

  async getFriendsForUser(userID: string): Promise<User[]> {

    return new Promise<User[]>((resolve, reject) => {

      let friends: Array<User> = [];

      this.authService.getRequestToken()
        .then((token) => {
          this.http
            .get(environment.serverURL + '/getAllFriends', {
              headers: new HttpHeaders().set('token', token),
            })
            .subscribe(
              (data) => {
                for (let i = 0; i < Object.values(data).length; i++) {
                  if (
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf('user1')
                      ]
                    ) == userID
                  ) {
                    let friendID = String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf('user2')
                      ]
                    );

                    this.userService
                      .getUserByID(friendID)
                      .then((user) => {
                        friends.push(user);
                      })
                      .catch((error) => {
                        reject(error);
                      });
                  } else if (
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf('user2')
                      ]
                    ) == userID
                  ) {
                    let friendID = String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf('user1')
                      ]
                    );

                    this.userService
                      .getUserByID(friendID)
                      .then((user) => {
                        friends.push(user);
                      })
                      .catch((error) => {
                        reject(error);
                      });
                  }
                }
                resolve(friends);
              },
              (error) => {
                reject(error);
              }
            );
        });
    });
  }

}

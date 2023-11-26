import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message } from "interfaces/message.interface";
import { User } from "interfaces/user.interface";
import { UserService } from "./user.service";
import { environment } from "../src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  
  constructor(private http: HttpClient, private userService: UserService, private authService: AuthService) { }

  // Get Messages for Users

  async getMessagesForUsers(user1: string, user2: string): Promise<Message[]> {

    return new Promise<Message[]>((resolve, reject) => {

      let messages: Array<Message> = [];

      this.authService.getRequestToken().then((token) => {
        this.http
          .get(environment.serverURL + "/getMessagesForUsers", {
            params: { user1: user1, user2: user2 },
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe(
            async (data) => {
              for (let i = 0; i < Object.values(data).length; i++) {
                let message: Message = {
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  sender: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("sender")
                    ]
                  ),
                  recipient: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("recipient")
                    ]
                  ),
                  text: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("text")
                    ]
                  ),
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("timestamp")
                      ]
                    )
                  ),
                };

                messages.push(message);
                messages.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }

              resolve(messages);
            },
            (error) => {
              reject(error);
            }
          );
      });
    });
  }

  // Send Message

  async sendMessage(sender: String, recipient: String, text: String) {

    let timestamp = new Date();

    await this.authService.getRequestToken().then((token) => {
      this.http
        .post(
          environment.serverURL + "/sendMessage",
          {
            sender: sender,
            recipient: recipient,
            text: text,
            timestamp: timestamp,
          },
          { headers: new HttpHeaders().set("token", token) }
        )
        .toPromise();
    });
  }

  // Delete Unopened Message Record

  async deleteUnopenedMessageRecord(sender: String, recipient: String) {

    await this.authService.getRequestToken().then((token) => {
      this.http
        .post(
          environment.serverURL + "/deleteUnopenedMessage",
          { sender: sender, recipient: recipient },
          { headers: new HttpHeaders().set("token", token) }
        )
        .toPromise();
    });

  }

  // Get Unopened Messages

  async getUnopenedMessageUsers(userID: string): Promise<Array<User>> {

    return new Promise<Array<User>>((resolve, reject) => {

      let users: Array<User> = [];

      this.authService.getRequestToken().then((token) => {
        this.http
          .get(
            environment.serverURL + "/getUnopenedMessagesForUser/" + userID,
            { headers: new HttpHeaders().set("token", token) }
          )
          .subscribe(
            async (data) => {
              for (let i = 0; i < Object.values(data).length; i++) {
                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[i])[
                      Object.keys(Object.values(data)[i]).indexOf("sender")
                      ]
                    )
                  )
                  .then((user) => {
                    users.push(user);
                  });
              }

              resolve(users);
            },
            (error) => {
              reject(error);
            }
          );
      });
    });
  }
}

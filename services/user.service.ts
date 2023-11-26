import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "interfaces/user.interface";
import { AuthService } from "./auth.service";
import { environment } from "../src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Get User by ID

  async getUserByID(id: string | null): Promise<User> {

    return new Promise<User>(async (resolve, reject) => {

      let user: User = {
        _id: "",
        username: "",
        avatar: "",
        editXP: 0,
        learnXP: 0,
      };

      if (id == "") {
        reject("No ID provided");
      }

      await this.authService.getRequestToken().then((token) => {
        this.http
          .get(environment.serverURL + "/getUserByID/" + id, {
            headers: new HttpHeaders().set("token", token),
          })
          .subscribe((data) => {
            user._id = Object.values(data)[Object.keys(data).indexOf("_id")];
            user.username =
              Object.values(data)[Object.keys(data).indexOf("username")];
            user.avatar =
              Object.values(data)[Object.keys(data).indexOf("avatar")];
            user.editXP = Number(
              Object.values(data)[Object.keys(data).indexOf("editXP")]
            );
            user.learnXP = Number(
              Object.values(data)[Object.keys(data).indexOf("lesrnXP")]
            );
          });

        resolve(user);
      });
    });
  }

  // Get User by Username

  async getUserByUsername(username: string | null): Promise<User> {

    return new Promise<User>(async (resolve, reject) => {

      let user: User = {
        _id: "",
        username: "",
        avatar: "",
        editXP: 0,
        learnXP: 0,
      };

      await this.authService
        .getRequestToken()
        .then((token) => {
          this.http
            .get(environment.serverURL + "/getUserByUsername/" + username, {
              headers: new HttpHeaders().set("token", token),
            })
            .subscribe((data) => {
              user._id = Object.values(data)[Object.keys(data).indexOf("_id")];
              user.username =
                Object.values(data)[Object.keys(data).indexOf("username")];
              user.avatar =
                Object.values(data)[Object.keys(data).indexOf("avatar")];
              user.editXP = Number(
                Object.values(data)[Object.keys(data).indexOf("editXP")]
              );
              user.learnXP = Number(
                Object.values(data)[Object.keys(data).indexOf("lesrnXP")]
              );
              resolve(user);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Get All Users

  async getAllUsers(): Promise<User[]> {

    return new Promise<User[]>(async (resolve, reject) => {

      let users: Array<User> = [];

      await this.authService
        .getRequestToken()
        .then((token) => {
          this.http
            .get(environment.serverURL + "/getAllUsers/", {
              headers: new HttpHeaders().set("token", token),
            })
            .subscribe((data) => {
              for (let i = 0; i < Object.values(data).length; i++) {
                let user: User = {
                  _id: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("_id")
                    ]
                  ),
                  username: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("username")
                    ]
                  ),
                  avatar: String(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("avatar")
                    ]
                  ),
                  editXP: Number(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("editXP")
                    ]
                  ),
                  learnXP: Number(
                    Object.values(Object.values(data)[i])[
                    Object.keys(Object.values(data)[i]).indexOf("learnXP")
                    ]
                  ),
                };
                users.push(user);
              }
              resolve(users);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Update User Edit XP

  async updateUserEditXP(userID: String, xp: number) {

    await this.authService.getRequestToken().then((token) => {
      return this.http
        .post(
          environment.serverURL + "/updateUserEditXP",
          { userID: userID, xp: xp },
          { headers: new HttpHeaders().set("token", token) }
        )
        .toPromise();
    });
  }

  // Update User Learn XP

  async updateUserLearnXP(userID: String, xp: number) {

    await this.authService.getRequestToken().then((token) => {
      return this.http
        .post(
          environment.serverURL + "/updateUserLearnXP",
          { userID: userID, xp: xp },
          { headers: new HttpHeaders().set("token", token) }
        )
        .toPromise();
    });
  }
}

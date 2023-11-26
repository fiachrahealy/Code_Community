import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Post } from "interfaces/post.interface";
import { UserService } from "./user.service";
import { User } from "interfaces/user.interface";
import { environment } from "../src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(private userService: UserService, private http: HttpClient, private authService: AuthService) { }

  // Create Post

  async createPost(title: String, body: String, user: String, type: Number) {

    let currentDate = new Date();

    await this.authService.getRequestToken().then((token) => {
      this.http
        .post(
          environment.serverURL + "/createPost",
          {
            title: title,
            body: body,
            user: user,
            timestamp: currentDate,
            type: type,
          },
          { headers: new HttpHeaders().set("token", token) }
        )
        .toPromise();
    });
  }

  // Get Friends Posts

  async getFriendsPosts(userID: string): Promise<Array<Post>> {

    return new Promise<Array<Post>>((resolve, reject) => {

      let friendsPosts: Array<Post> = [];

      this.authService
        .getRequestToken()
        .then((token) => {
          this.http
            .get(environment.serverURL + "/getAllPosts/", {
              headers: new HttpHeaders().set("token", token),
            })
            .subscribe(async (posts) => {
              for (let j = 0; j < Object.values(posts).length; j++) {
                if (
                  userID ==
                  String(
                    Object.values(Object.values(posts)[j])[
                    Object.keys(Object.values(posts)[j]).indexOf("user")
                    ]
                  )
                ) {
                  let author: User = {
                    _id: "",
                    username: "",
                    avatar: "",
                    editXP: 0,
                    learnXP: 0,
                  };

                  await this.userService
                    .getUserByID(
                      String(
                        Object.values(Object.values(posts)[j])[
                        Object.keys(Object.values(posts)[j]).indexOf("user")
                        ]
                      )
                    )
                    .then((user) => {
                      author = user;
                    });

                  let post: Post = {
                    _id: String(
                      Object.values(Object.values(posts)[j])[
                      Object.keys(Object.values(posts)[j]).indexOf("_id")
                      ]
                    ),
                    title: String(
                      Object.values(Object.values(posts)[j])[
                      Object.keys(Object.values(posts)[j]).indexOf("title")
                      ]
                    ),
                    body: String(
                      Object.values(Object.values(posts)[j])[
                      Object.keys(Object.values(posts)[j]).indexOf("body")
                      ]
                    ),
                    user: author,
                    timestamp: new Date(
                      String(
                        Object.values(Object.values(posts)[j])[
                        Object.keys(Object.values(posts)[j]).indexOf(
                          "timestamp"
                        )
                        ]
                      )
                    ),
                    type: Number(
                      Object.values(Object.values(posts)[j])[
                      Object.keys(Object.values(posts)[j]).indexOf("type")
                      ]
                    ),
                  };

                  friendsPosts.push(post);
                  friendsPosts.sort(
                    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                  );
                } else {
                  this.http
                    .get(environment.serverURL + "/getAllFriends", {
                      headers: new HttpHeaders().set("token", token),
                    })
                    .subscribe(async (data) => {
                      for (let i = 0; i < Object.values(data).length; i++) {
                        let friendID = "";
                        if (
                          String(
                            Object.values(Object.values(data)[i])[
                            Object.keys(Object.values(data)[i]).indexOf(
                              "user1"
                            )
                            ]
                          ) == userID
                        ) {
                          friendID = String(
                            Object.values(Object.values(data)[i])[
                            Object.keys(Object.values(data)[i]).indexOf(
                              "user2"
                            )
                            ]
                          );
                          if (
                            friendID ==
                            String(
                              Object.values(Object.values(posts)[j])[
                              Object.keys(Object.values(posts)[j]).indexOf(
                                "user"
                              )
                              ]
                            )
                          ) {
                            let author: User = {
                              _id: "",
                              username: "",
                              avatar: "",
                              editXP: 0,
                              learnXP: 0,
                            };

                            await this.userService
                              .getUserByID(
                                String(
                                  Object.values(Object.values(posts)[j])[
                                  Object.keys(
                                    Object.values(posts)[j]
                                  ).indexOf("user")
                                  ]
                                )
                              )
                              .then((user) => {
                                author = user;
                              });

                            let post: Post = {
                              _id: String(
                                Object.values(Object.values(posts)[j])[
                                Object.keys(Object.values(posts)[j]).indexOf(
                                  "_id"
                                )
                                ]
                              ),
                              title: String(
                                Object.values(Object.values(posts)[j])[
                                Object.keys(Object.values(posts)[j]).indexOf(
                                  "title"
                                )
                                ]
                              ),
                              body: String(
                                Object.values(Object.values(posts)[j])[
                                Object.keys(Object.values(posts)[j]).indexOf(
                                  "body"
                                )
                                ]
                              ),
                              user: author,
                              timestamp: new Date(
                                String(
                                  Object.values(Object.values(posts)[j])[
                                  Object.keys(
                                    Object.values(posts)[j]
                                  ).indexOf("timestamp")
                                  ]
                                )
                              ),
                              type: Number(
                                Object.values(Object.values(posts)[j])[
                                Object.keys(Object.values(posts)[j]).indexOf(
                                  "type"
                                )
                                ]
                              ),
                            };

                            friendsPosts.push(post);
                            friendsPosts.sort(
                              (a, b) =>
                                b.timestamp.getTime() - a.timestamp.getTime()
                            );
                          }
                        } else if (
                          String(
                            Object.values(Object.values(data)[i])[
                            Object.keys(Object.values(data)[i]).indexOf(
                              "user2"
                            )
                            ]
                          ) == userID
                        ) {
                          friendID = String(
                            Object.values(Object.values(data)[i])[
                            Object.keys(Object.values(data)[i]).indexOf(
                              "user1"
                            )
                            ]
                          );
                          if (
                            friendID ==
                            String(
                              Object.values(Object.values(posts)[j])[
                              Object.keys(Object.values(posts)[j]).indexOf(
                                "user"
                              )
                              ]
                            )
                          ) {
                            let author: User = {
                              _id: "",
                              username: "",
                              avatar: "",
                              editXP: 0,
                              learnXP: 0,
                            };

                            await this.userService
                              .getUserByID(
                                String(
                                  Object.values(Object.values(posts)[j])[
                                  Object.keys(
                                    Object.values(posts)[j]
                                  ).indexOf("user")
                                  ]
                                )
                              )
                              .then((user) => {
                                author = user;
                              });

                            let post: Post = {
                              _id: String(
                                Object.values(Object.values(posts)[j])[
                                Object.keys(Object.values(posts)[j]).indexOf(
                                  "_id"
                                )
                                ]
                              ),
                              title: String(
                                Object.values(Object.values(posts)[j])[
                                Object.keys(Object.values(posts)[j]).indexOf(
                                  "title"
                                )
                                ]
                              ),
                              body: String(
                                Object.values(Object.values(posts)[j])[
                                Object.keys(Object.values(posts)[j]).indexOf(
                                  "body"
                                )
                                ]
                              ),
                              user: author,
                              timestamp: new Date(
                                String(
                                  Object.values(Object.values(posts)[j])[
                                  Object.keys(
                                    Object.values(posts)[j]
                                  ).indexOf("timestamp")
                                  ]
                                )
                              ),
                              type: Number(
                                Object.values(Object.values(posts)[j])[
                                Object.keys(Object.values(posts)[j]).indexOf(
                                  "type"
                                )
                                ]
                              ),
                            };

                            friendsPosts.push(post);
                            friendsPosts.sort(
                              (a, b) =>
                                b.timestamp.getTime() - a.timestamp.getTime()
                            );
                          }
                        }
                      }
                    });
                }
              }
              resolve(friendsPosts);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Get Posts For User

  async getPostsForUser(userID: string): Promise<Array<Post>> {
    return new Promise<Array<Post>>((resolve, reject) => {
      let posts: Array<Post> = [];

      this.authService
        .getRequestToken()
        .then((token) => {
          this.http
            .get(environment.serverURL + "/getPostsForUser/" + userID, {
              headers: new HttpHeaders().set("token", token),
            })
            .subscribe(async (data) => {
              for (let j = 0; j < Object.values(data).length; j++) {
                let author: User = {
                  _id: "",
                  username: "",
                  avatar: "",
                  editXP: 0,
                  learnXP: 0,
                };

                await this.userService
                  .getUserByID(
                    String(
                      Object.values(Object.values(data)[j])[
                      Object.keys(Object.values(data)[j]).indexOf("user")
                      ]
                    )
                  )
                  .then((user) => {
                    author = user;
                  });

                let post: Post = {
                  _id: String(
                    Object.values(Object.values(data)[j])[
                    Object.keys(Object.values(data)[j]).indexOf("_id")
                    ]
                  ),
                  title: String(
                    Object.values(Object.values(data)[j])[
                    Object.keys(Object.values(data)[j]).indexOf("title")
                    ]
                  ),
                  body: String(
                    Object.values(Object.values(data)[j])[
                    Object.keys(Object.values(data)[j]).indexOf("body")
                    ]
                  ),
                  user: author,
                  timestamp: new Date(
                    String(
                      Object.values(Object.values(data)[j])[
                      Object.keys(Object.values(data)[j]).indexOf("timestamp")
                      ]
                    )
                  ),
                  type: Number(
                    Object.values(Object.values(data)[j])[
                    Object.keys(Object.values(data)[j]).indexOf("type")
                    ]
                  ),
                };

                posts.push(post);
                posts.sort(
                  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                );
              }
              resolve(posts);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

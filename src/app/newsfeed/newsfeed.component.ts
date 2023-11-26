import { Component, OnInit } from '@angular/core';
import { Post } from 'interfaces/post.interface';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { FriendService } from 'services/friend.service';
import { PostService } from 'services/post.service';
import { UserService } from 'services/user.service';
import { faPen, faGraduationCap, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, public postService: PostService) { }

  user: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };

  post: Post = {
    _id: "",
    title: "",
    body: "",
    user: {
      _id: "",
      username: "",
      avatar: "",
      editXP: 0,
      learnXP: 0
    },
    timestamp: new Date(),
    type: 0
  };

  posts: Array<Post> = [];

  faPen = faPen;
  faGraduationCap = faGraduationCap;
  faTrophy = faTrophy;

  ngOnInit(): void {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

      });

    this.pullPostData();

  }

  // Pull Post Data

  pullPostData() {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.postService.getFriendsPosts(userID)
          .then((posts) => {
            this.posts = posts;
          });

      });

  }

  // Write Post

  writePost() {

    this.postService.createPost(this.post.title, this.post.body, this.user._id, 1)
      .then(() => {
        this.pullPostData();
        this.post.body = "";
        this.post.title = "";
      })

  }

}

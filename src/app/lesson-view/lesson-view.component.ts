import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseLearnRecord } from 'interfaces/course-learn-record';
import { Course } from 'interfaces/course.interface';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { CourseService } from 'services/course.service';
import { LessonService } from 'services/lesson.service';
import { PostService } from 'services/post.service';
import { RecordService } from 'services/record.service';
import { UserService } from 'services/user.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss']
})
export class LessonViewComponent implements OnInit {

  lesson: any = {
    _id: "",
    title: "",
    course: "",
    chunks: []
  }

  course: Course = {
    _id: "",
    title: "",
    level: "",
    lessons: [],
    ratings: []
  };

  user: User = {
    _id: '',
    username: '',
    avatar: '',
    editXP: 0,
    learnXP: 0
  };

  record: CourseLearnRecord = {
    course: '',
    user: '',
    lessonsCompleted: [],
    completed: false
  };

  quizAnswers: Array<String> = [];

  faXmark = faXmark;
  faCheck = faCheck;

  constructor(private postService: PostService, private authService: AuthService, public dialog: MatDialog, private userService: UserService, private courseService: CourseService, private recordService: RecordService, private router: Router, private lessonService: LessonService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.lessonService.getLesson(this.route.snapshot.params['lesson'])
          .then((lesson) => {
            this.lesson = lesson;
          });

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

        this.courseService.getCourse(this.route.snapshot.params['course'])
          .then((course) => {
            this.course = course;
          });

        this.recordService.getCourseLearnRecord(userID, this.route.snapshot.params['course'])
          .then((record) => {
            this.record = record;
          });

      });

  }

  // Complete Lesson

  completeLesson() {

    let quizIsWrong = false;

    for (let i = 0; i < this.lesson.chunks.length; i++) {

      if (this.lesson.chunks[i].type == 4) {

        if (this.quizAnswers[i] != this.lesson.chunks[i].correctAnswer) {

          quizIsWrong = true

        }

      }

    }

    if (!quizIsWrong) {

      this.record.lessonsCompleted.push(this.lesson._id);

      let notComplete = false;

      for (let i = 0; i < this.course.lessons.length; i++) {

        if (!this.record.lessonsCompleted.includes(this.course.lessons[i]._id)) {

          notComplete = true;

        }

      }

      if (!notComplete) {

        this.recordService.completeLesson(this.user._id, this.course._id, this.lesson._id, true)
          .then(() => {
            this.postService.createPost("@" + this.user.username + " completed a lesson", "@" + this.user.username + " completed the lesson \"" + this.lesson.title + "\" in the course \"" + this.course.title + "\"", this.user._id, 3);
            this.postService.createPost("@" + this.user.username + " completed a course", "@" + this.user.username + " completed the course \"" + this.course.title + "\"", this.user._id, 3);
            this.router.navigate(['/courses/view/' + this.lesson.course]);
          })


      }
      else {

        this.recordService.completeLesson(this.user._id, this.course._id, this.lesson._id, false)
          .then(() => {
            this.postService.createPost("@" + this.user.username + " completed a lesson", "@" + this.user.username + " completed the lesson \"" + this.lesson.title + "\" in the course \"" + this.course.title + "\"", this.user._id, 3);
            this.router.navigate(['/courses/view/' + this.lesson.course]);
          })

      }

    }
    else {

      const dialogRef = this.dialog.open(ConfirmComponent, {

        height: '300px',
        width: '400px',
        data: {
          heading: "Cannot Complete Lesson",
          body: "You have answered a quiz question incorrectly!",
          boxes: false
        }

      });

    }

  }

  // Cancel

  cancel() {

    this.router.navigate(['/courses/view/' + this.lesson.course]);

  }

}

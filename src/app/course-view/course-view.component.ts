import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseLearnRecord } from 'interfaces/course-learn-record';
import { Course } from 'interfaces/course.interface';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { CourseService } from 'services/course.service';
import { DataRefreshService } from 'services/data-refresh.service';
import { RecordService } from 'services/record.service';
import { UserService } from 'services/user.service';
import { RatingComponent } from '../rating/rating.component';
import { faStar, faGraduationCap, faRotateLeft, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {

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

  faStar = faStar;
  faGraduationCap = faGraduationCap;
  faRotateLeft = faRotateLeft;
  faLock = faLock;
  faCheck = faCheck;

  constructor(private dataRefreshService: DataRefreshService, private recordService: RecordService, private authService: AuthService, private userService: UserService, public courseService: CourseService, private route: ActivatedRoute, public router: Router, public dialog: MatDialog) {

    this.dataRefreshService.courseViewEvent.subscribe(value => {

      if (value === true) {
        this.pullCourseData();
      }

    });

  }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.pullCourseData();

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

        this.recordService.getCourseLearnRecord(userID, this.route.snapshot.params['course'])
          .then((record) => {
            this.record = record;
          });

      });

  }

  // Reset Course

  resetCourse() {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.recordService.deleteCourseLearnRecord(userID, this.route.snapshot.params['course'])
          .then(() => {
            this.router.navigate(['../../']);
          });

      });

  }

  // Is Completed

  isCompleted(lessonID: string) {

    for (let i = 0; i < this.record.lessonsCompleted.length; i++) {

      if (this.record.lessonsCompleted[i] == lessonID) {

        return true;

      }

    }

    return false;

  }

  // Is Unlocked

  isUnlocked(lessonID: string) {

    let unlockedLessons: Array<String> = [];

    for (let i = 0; i < this.course.lessons.length; i++) {

      if (!this.isCompleted(this.course.lessons[i]._id)) {

        if (unlockedLessons.length < 4) {

          unlockedLessons.push(this.course.lessons[i]._id);

        }

      }

    }

    if (unlockedLessons.includes(lessonID)) {

      return true

    }

    return false;

  }

  // Open Rating Dialog

  openRatingDialog() {

    const dialogRef = this.dialog.open(RatingComponent, {

      height: '300px',
      width: '400px',
      data: {
        courseID: this.course._id
      }

    });

  }

  // Pull Course Data

  pullCourseData() {

    this.courseService.getCourse(this.route.snapshot.params['course'])
      .then((course) => {
        this.course = course;
      });

  }

  // Count Positive Stars

  counterPosStar(i: Number) {

    return new Array(i);

  }

  // Count Negative Stars

  counterNegStar(i: Number) {

    return new Array(5 - Number(i));

  }

}

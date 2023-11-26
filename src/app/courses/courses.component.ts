import { Component, OnInit } from '@angular/core';
import { Course } from 'interfaces/course.interface';
import { User } from 'interfaces/user.interface';
import { CourseService } from 'services/course.service';
import { UserService } from 'services/user.service';
import { AuthService } from 'services/auth.service';
import { RecordService } from 'services/record.service';
import { Router } from '@angular/router';
import { CourseLearnRecord } from 'interfaces/course-learn-record';
import { faStar, faPlay, faPen, faUndo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  user: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };

  courses: Array<Course> = [];
  records: Array<CourseLearnRecord> = [];

  faStar = faStar;
  faPlay = faPlay;
  faPen = faPen;
  faUndo = faUndo;

  constructor(private router: Router, private authService: AuthService, public courseService: CourseService, private userService: UserService, private recordService: RecordService) { }

  ngOnInit() {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

        this.courseService.getAllCourses()
          .then((courses) => {
            this.courses = courses;
          });

        this.recordService.getCourseLearnRecordsForUser(userID)
          .then((records) => {
            this.records = records;
          });

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

  // Start Course

  startCourse(courseID: String) {

    this.recordService.createCourseLearnRecord(this.user._id, courseID)
      .then(() => {
        this.router.navigate(['/courses/view/' + courseID]);
      });

  }

  // Has Course Record

  hasACourseRecord(courseID: String): Boolean {

    for (let i = 0; i < this.records.length; i++) {

      if (this.records[i].course == courseID) {

        return true;

      }

    }

    return false;

  }

  // Has Completed Course

  hasCompletedCourse(courseID: String): Boolean {

    for (let i = 0; i < this.records.length; i++) {

      if (this.records[i].course == courseID) {

        if (this.records[i].completed) {

          return true;

        }

      }

    }

    return false;

  }

  // Resume Course

  resumeCourse(courseID: String) {

    this.router.navigate(['/courses/view/' + courseID]);

  }

}

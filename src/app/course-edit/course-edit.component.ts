import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'interfaces/course.interface';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { CourseService } from 'services/course.service';
import { DataRefreshService } from 'services/data-refresh.service';
import { PostService } from 'services/post.service';
import { UserService } from 'services/user.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { HistoryComponent } from '../history/history.component';
import { LessonCreateComponent } from '../lesson-create/lesson-create.component';
import { faSave, faArrowsAlt, faTrash, faHistory, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  course: Course = {
    _id: "",
    title: "",
    level: "",
    lessons: [],
    ratings: []
  };

  previousCourse: Course = {
    _id: "",
    title: "",
    level: "",
    lessons: [],
    ratings: []
  };

  unsavedChangesTitle: Boolean = false;
  unsavedChangesLessons: Boolean = false;

  lessonsReordered: Boolean = false;
  loading: Boolean = false;

  user: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };

  unsavedLessons: number = 0;

  faSave = faSave;
  faArrowsAlt = faArrowsAlt;
  faTrash = faTrash;
  faHistory = faHistory;
  faPlus = faPlus;
  faPen = faPen;

  constructor(private postService: PostService, private authService: AuthService, private router: Router, private userService: UserService, public courseService: CourseService, private dataRefreshService: DataRefreshService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

        this.courseService.getCourse(this.route.snapshot.params['course'])
          .then((course) => {
            this.course = course;
          });

        this.courseService.getCourse(this.route.snapshot.params['course'])
          .then((course) => {
            this.previousCourse = course;
          });

      });

  }

  // Drag and Drop

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.course.lessons, event.previousIndex, event.currentIndex);
    this.lessonsReordered = true;
  }

  // Delete Lesson

  deleteLesson(index: number) {

    this.course.lessons.splice(index, 1);

    if (this.course.lessons != this.previousCourse.lessons) {

      this.unsavedChangesLessons = true;

    }
    else {

      this.unsavedChangesLessons = false;

    }

  }

  // Count Positive Stars

  counterPosStar(i: Number) {

    return new Array(i);

  }

  // Count Negative Stars

  counterNegStar(i: Number) {

    return new Array(5 - Number(i));

  }

  // Open Lesson Create Dialog

  openLessonCreateDialog() {

    const dialogRef = this.dialog.open(LessonCreateComponent, {

      height: '300px',
      width: '400px',
      data: {
        unsavedLessonsAdded: this.unsavedLessons
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.newLesson) {
        this.unsavedLessons++;
        this.course.lessons.push(result.data);
        this.unsavedChangesLessons = true;
      }
    });

  }

  // Open History Dialog

  openHistory() {

    const dialogRef = this.dialog.open(HistoryComponent, {

      height: '700px',
      width: '950px',
      data: {
        courseID: this.course._id
      }

    });

  }

  // Save Changes

  saveChanges() {

    this.loading = true;

    this.courseService.updateCourse(this.previousCourse, this.course, this.user._id, this.lessonsReordered)
      .then(() => {
        this.postService.createPost("@" + this.user.username + " contributed to a course", "@" + this.user.username + " updated the content of the course \"" + this.course.title + "\"", this.user._id, 2)
        this.router.navigate(['../']);
        this.loading = false;
      })

  }

  // Show Edit Button

  showEditBtn(id: String): Boolean {

    if (id.includes("unsaved")) {

      return false;

    }
    else {

      return true;

    }

  }

  // Title Change

  titleChange() {

    if (this.course.title != this.previousCourse.title) {

      this.unsavedChangesTitle = true;

    }
    else {

      this.unsavedChangesTitle = false;

    }

  }

  // Unsaved Changes Confirm

  unsavedChangesConfirm(route: String) {

    if (!this.unsavedChangesTitle && !this.unsavedChangesLessons) {

      this.router.navigate([route]);

    }
    else {

      const dialogRef = this.dialog.open(ConfirmComponent, {

        height: '300px',
        width: '400px',
        data: {
          heading: "Are you sure?",
          body: "You have unsaved changes!",
          boxes: true
        }

      });

      dialogRef.afterClosed().subscribe(result => {

        if (result.confirm) {

          this.router.navigate([route]);

        }

      });

    }

  }

}

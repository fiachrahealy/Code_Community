import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lesson } from 'interfaces/lesson.interface';
import { User } from 'interfaces/user.interface';
import { AuthService } from 'services/auth.service';
import { UserService } from 'services/user.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.scss']
})
export class LessonCreateComponent implements OnInit {

  lessonTitle = "";
  user: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };

  faTimes = faTimes;

  constructor(private authService: AuthService, private userService: UserService, public dialogRef: MatDialogRef<LessonCreateComponent>, private ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: any) { }

  // Close Dialog

  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

  ngOnInit(): void {

    this.authService.getCurrentUserID()
      .then((userID) => {

        this.userService.getUserByID(userID)
          .then((user) => {
            this.user = user;
          });

      });

  }

  // Create Lesson

  createLesson() {

    let lesson: Lesson = {
      _id: "unsaved" + String(this.data.unsavedLessonsAdded + 1),
      title: this.lessonTitle,
      course: "",
      chunks: []
    };

    this.dialogRef.close({ newLesson: true, data: lesson });

  }


}

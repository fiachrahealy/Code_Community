import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CodeChunk } from 'interfaces/code-chunk.interface';
import { ImageChunk } from 'interfaces/image-chunk.interface';
import { TextChunk } from 'interfaces/text-chunk.interface';
import { QuizChunk } from 'interfaces/quiz-chunk.interface';
import { Lesson } from 'interfaces/lesson.interface';
import { User } from 'interfaces/user.interface';
import { Course } from 'interfaces/course.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'services/user.service';
import { CourseService } from 'services/course.service';
import { LessonService } from 'services/lesson.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AuthService } from 'services/auth.service';
import { PostService } from 'services/post.service';
import { faSave, faTrash, faCode, faFont, faImage, faQuestion, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss'],
})

export class LessonEditComponent implements OnInit {

  lesson: any = {
    _id: "",
    title: "",
    course: "",
    chunks: []
  }

  previousLesson: Lesson = {
    _id: "",
    title: "",
    course: "",
    chunks: []
  }

  user: User = {
    _id: "",
    username: "",
    avatar: "",
    editXP: 0,
    learnXP: 0
  };

  course: Course = {
    _id: "",
    title: "",
    level: "",
    lessons: [],
    ratings: []
  };

  files: Map<number, any> = new Map<number, any>();

  unsavedChangesChunks: Boolean = false;
  unsavedChangesTitle: Boolean = false;

  chunksReordered: Boolean = false;

  unsavedChunks: number = 0;

  loading: Boolean = false;

  faSave = faSave;
  faTrash = faTrash;
  faCode = faCode;
  faFont = faFont;
  faImage = faImage;
  faQuestion = faQuestion;
  faArrowsAlt = faArrowsAlt;

  constructor(private postService: PostService, private authService: AuthService, private router: Router, private lessonService: LessonService, private userService: UserService, public courseService: CourseService, private route: ActivatedRoute, public dialog: MatDialog) { }

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

        this.lessonService.getLesson(this.route.snapshot.params['lesson'])
          .then((lesson) => {
            this.lesson = lesson;
          });

        this.lessonService.getLesson(this.route.snapshot.params['lesson'])
          .then((lesson) => {
            this.previousLesson = lesson;
          });

      });

  }

  // Obtain Data From Editor

  obtainDataFromEditor(data: Object[]) {

    this.lesson.chunks[Number(data[1])].code = String(data[0]);

  }

  // Drag and Drop

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lesson.chunks, event.previousIndex, event.currentIndex);
    this.chunksReordered = true;
  }

  // Delete Chunk

  deleteChunk(index: number) {

    this.lesson.chunks.splice(index, 1);

    if (this.lesson.chunks != this.previousLesson.chunks) {

      this.unsavedChangesChunks = true;

    }
    else {

      this.unsavedChangesChunks = false;

    }

  }

  // Title Change

  titleChange() {

    if (this.lesson.title != this.previousLesson.title) {

      this.unsavedChangesTitle = true;

    }
    else {

      this.unsavedChangesTitle = false;

    }

  }

  // Save Changes

  saveChanges() {

    this.loading = true;

    this.lessonService.updateLesson(this.previousLesson, this.lesson, this.user._id, this.chunksReordered, this.files)
      .then(() => {
        this.postService.createPost("@" + this.user.username + " contributed to a lesson", "@" + this.user.username + " updated the content of the lesson \"" + this.lesson.title + "\" in the course \"" + this.course.title + "\"", this.user._id, 2)
        this.router.navigate(['/courses/edit/' + this.course._id]);
        this.loading = false;
      })

  }

  // Add Component

  addComponent(type: Number) {

    this.unsavedChunks++;

    switch (type) {
      case 1: {
        let chunk: CodeChunk = {
          title: "",
          code: "",
          language: 0,
          _id: "unsaved" + this.unsavedChunks,
          lesson: "",
          type: 1
        };
        this.lesson.chunks.push(chunk);
        break;
      }
      case 2: {
        let chunk: ImageChunk = {
          title: "",
          file: "",
          _id: "unsaved" + this.unsavedChunks,
          lesson: "",
          type: 2
        };
        this.lesson.chunks.push(chunk);
        break;
      }
      case 3: {
        let chunk: TextChunk = {
          title: "",
          text: "",
          fontSize: 14,
          _id: "unsaved" + this.unsavedChunks,
          lesson: "",
          type: 3
        };
        this.lesson.chunks.push(chunk);
        console.log(this.lesson.chunks);
        break;
      }
      case 4: {
        let chunk: QuizChunk = {
          title: "",
          question: "",
          answers: ["", "", "", ""],
          correctAnswer: "A",
          _id: "unsaved" + this.unsavedChunks,
          lesson: "",
          type: 4
        };
        this.lesson.chunks.push(chunk);
        break;
      }
      default: {
        break;
      }
    }

  }

  // File Upload

  fileUpload(event: any, index: number) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.files.set(index, file);
      const reader = new FileReader();
      reader.onload = e => this.lesson.chunks[index].file = reader.result;
      reader.readAsDataURL(file);
    }



    (<HTMLInputElement>document.getElementById("image" + index)).value = (<HTMLInputElement>document.getElementById("file-upload" + index)).value.split('\\')[2];

  }

  // Unsaved Changes Confirm

  unsavedChangesConfirm() {

    if (!this.unsavedChangesChunks && !this.unsavedChangesTitle) {

      this.router.navigate(['/courses/edit/' + this.course._id]);

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

          this.router.navigate(['../']);

        }

      });

    }


  }

}

import { AfterViewInit, Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'interfaces/course.interface';
import { CourseService } from 'services/course.service';
import { RecordService } from 'services/record.service';
import { faTimes, faPen, faPlus, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit {

  course: Course = {
    _id: "",
    title: "",
    level: "",
    lessons: [],
    ratings: []
  };

  records: Array<any> = [];
  loading: Boolean = true;

  faBars = faBars;
  faTimes = faTimes;
  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;

  constructor(private recordService: RecordService, private courseService: CourseService, public dialogRef: MatDialogRef<HistoryComponent>, private ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.loading = false;
    }, 4000);

  }

  ngOnInit(): void {

    this.courseService.getCourse(this.data.courseID)
      .then((course) => {
        this.course = course;
      });

    this.recordService.getEditRecordsForCourse(this.data.courseID)
      .then((records) => {
        this.records = records;
      })

  }

  // Close Dialog

  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

}

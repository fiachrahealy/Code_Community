import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from 'services/course.service';
import { DataRefreshService } from 'services/data-refresh.service';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  faStar = faStar;
  faTimes = faTimes;

  constructor(private dataRefreshService: DataRefreshService, private courseService: CourseService, public dialogRef: MatDialogRef<RatingComponent>, private ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: any) { }

  // Close Dialog

  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

  // Rate Course

  rateCourse(rating: number) {

    this.courseService.rateCourse(this.data.courseID, rating)
      .then(() => {
        this.dataRefreshService.refreshCourseViewCourse();
        this.closeDialog();
      });

  }

  ngOnInit(): void {
  }
}

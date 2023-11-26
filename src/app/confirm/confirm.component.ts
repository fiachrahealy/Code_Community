import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataRefreshService } from 'services/data-refresh.service';
import { LessonCreateComponent } from '../lesson-create/lesson-create.component';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  faTimes = faTimes;

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>, private ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  // Close Dialog

  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

  // Confirm

  confirm() {
    this.dialogRef.close({ confirm: true });
  }

}

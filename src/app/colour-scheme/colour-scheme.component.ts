import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ColourSchemeService } from 'services/colour-scheme.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-colour-scheme',
  templateUrl: './colour-scheme.component.html',
  styleUrls: ['./colour-scheme.component.scss']
})
export class ColourSchemeComponent implements OnInit {

  faTimes = faTimes;

  constructor(public dialogRef: MatDialogRef<ColourSchemeComponent>, public colourSchemeService: ColourSchemeService, private ngZone: NgZone) { }

  // Close Dialog

  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

  ngOnInit(): void { }


}

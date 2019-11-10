import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderToolbarComponent } from '../header-toolbar/header-toolbar.component';


@Component({
  selector: 'app-manage-trip-dialogue',
  templateUrl: './manage-trip-dialogue.component.html',
  styleUrls: ['./manage-trip-dialogue.component.css']
})
export class ManageTripDialogueComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HeaderToolbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

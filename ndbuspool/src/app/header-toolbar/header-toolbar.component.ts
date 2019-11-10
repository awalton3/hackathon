import { Component, OnInit, Input } from '@angular/core';
import { ManageTripDialogueComponent } from '../manage-trip-dialogue/manage-trip-dialogue.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css']
})
export class HeaderToolbarComponent implements OnInit {

  @Input() title: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ManageTripDialogueComponent, {
      width: '500px',
      height: '500px',
      data: { }
    });
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/database.service';
import { AvailableGroupsComponent } from '../available-groups.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-group-dialogue',
  templateUrl: './create-group-dialogue.component.html',
  styleUrls: ['./create-group-dialogue.component.css']
})
export class CreateGroupDialogueComponent implements OnInit {

  groupForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AvailableGroupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dbService: DatabaseService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.groupForm = new FormGroup({
      'date': new FormControl(null),
      'time': new FormControl(null),
      'origin': new FormControl(null),
      'dest': new FormControl(null),
      'limit': new FormControl(null)
    })
  }

  addGroup() {
    let currDate = new Date();
    currDate.setHours(0)
    currDate.setMinutes(0)
    currDate.setSeconds(0)
    this.dbService.createGroup(sessionStorage.getItem("userID"), this.groupForm.value.date, this.groupForm.value.time, this.groupForm.value.origin, this.groupForm.value.dest, 4)
    this.dialogRef.close();
  }

}

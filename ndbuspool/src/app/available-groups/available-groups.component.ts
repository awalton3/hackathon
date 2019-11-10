import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupDialogueComponent } from './create-group-dialogue/create-group-dialogue.component';

@Component({
  selector: 'app-available-groups',
  templateUrl: './available-groups.component.html',
  styleUrls: ['./available-groups.component.css']
})
export class AvailableGroupsComponent implements OnInit {

  // Initialize Variables
  currUserID: string;

  constructor(private dbService: DatabaseService, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit() {
    //Get User from fb collection
    this.currUserID = sessionStorage.getItem('userID')
    this.dbService.getUser(this.currUserID).subscribe(user => {
      console.log(user.data());

      //Fetching Groups with ORIGIN (From ND to Aiport)
      this.fetchGroups("ND", user.data().req_nd_dep.location, user.data().req_nd_dep.date)

      //Fetching Groups with END (From Airport to ND)
      this.fetchGroups(user.data().req_airport_dep.location, "ND", user.data().req_airport_dep.date)

    })
  }

  onCreateGroup() {
    // Launch form
    const dialogRef = this.dialog.open(CreateGroupDialogueComponent, {
      width: '400px',
      height: '400px',
      data: {}
    });
  }

  // createGroup() {
  //   let currDate = new Date();
  //   currDate.setHours(0)
  //   currDate.setMinutes(0)
  //   currDate.setSeconds(0)
  //   this.dbService.createGroup(this.currUserID, currDate, "8:30pm", "ND", "MDW", 4)
  // }

  joinGroup() {
    this.dbService.joinGroup(this.currUserID, "rXQYacozNeRo51W3b6CU")
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }

  fetchGroups(origin, dest, date) {
    this.dbService.fetchGroups(origin, dest, date)
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }

}

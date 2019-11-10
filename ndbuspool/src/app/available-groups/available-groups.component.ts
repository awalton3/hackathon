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
    this.dbService.joinGroup(this.currUserID, "sFc0UPpIzu7w7z614MRf")
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }

  fetchGroups(origin, dest, date) {
    this.dbService.fetchGroups(origin, dest, date)
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }

  deleteGroup(){
    this.dbService.deleteGroup("sFc0UPpIzu7w7z614MRf")
    console.log("Check if sFc0UPpIzu7w7z614MRf deleted.")

  }

  leaveGroup(){
    this.dbService.leaveGroup("URu65PRrWsVGEhe61CPDtlY3NlG2","zoCWaKApKcIpBh4gaFNu")
    console.log("Check if URu65PRrWsVGEhe61CPDtlY3NlG2 left group zoCWaKApKcIpBh4gaFNu.")

  }
  //
  // fetchGroups(origin, dest, time) {
  //   console.log(this.dbService.fetchGroups("ND", "Midway", "November 10, 2019 at 12:00:00 AM UTC-5"))
  //   console.log("groups supposedly fetched.")
  // }

  updateTrip(){
      this.dbService.updateTrip("7j1FVj7UudckLRPZDisMtDnkCGk1", null, "TEST")
      console.log("Check if 7j1FVj7UudckLRPZDisMtDnkCGk1 updated.")
  }

  deleteTrip(){
    this.dbService.deleteTrip("IprQOsNn3XYIx39lCESBxflIzPM2")
    console.log("Check if trip IprQOsNn3XYIx39lCESBxflIzPM2 deleted")
  }

}

import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-available-groups',
  templateUrl: './available-groups.component.html',
  styleUrls: ['./available-groups.component.css']
})
export class AvailableGroupsComponent implements OnInit {

  // Initialize Variables
  currUserID: string;

  constructor(private dbService: DatabaseService, private datePipe: DatePipe) { }

  ngOnInit() {
    //Get User from fb collection
    this.currUserID = sessionStorage.getItem('userID')
    this.dbService.getUser(this.currUserID).subscribe(user => {
      console.log(user);
    })
  }

  createGroup() {
    let currDate = new Date();
    currDate.setHours(0)
    currDate.setMinutes(0)
    currDate.setSeconds(0)
    this.dbService.createGroup(this.currUserID, currDate, "8:30pm", "ND", "MDW", 4)
  }

  joinGroup() {
    this.dbService.joinGroup(this.currUserID, "sFc0UPpIzu7w7z614MRf")
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }

  deleteGroup(){
    this.dbService.deleteGroup("sFc0UPpIzu7w7z614MRf")
    

  }

  leaveGroup(){

  }

  fetchGroups(origin, dest, time) {
    this.dbService.fetchGroups("ND", "Midway", "8:30pm")
  }

  updateTrip(){

  }

  deleteTrip(){

  }

}

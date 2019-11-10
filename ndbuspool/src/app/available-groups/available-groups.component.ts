import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-available-groups',
  templateUrl: './available-groups.component.html',
  styleUrls: ['./available-groups.component.css']
})
export class AvailableGroupsComponent implements OnInit {

  // Initialize Variables
  currUserID: string;

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    //Get User from fb collection
    this.currUserID = sessionStorage.getItem('userID')
    this.dbService.getUser(this.currUserID).subscribe(user => {
      console.log(user);
    })
  }

  createGroup() {
    this.dbService.createGroup(this.currUserID, "8:30pm", "ND", "Midway", 4)
  }

  joinGroup() {
    this.dbService.joinGroup(this.currUserID, "rXQYacozNeRo51W3b6CU")
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }

  fetchGroups(origin, dest, time) {
    this.dbService.fetchGroups("ND", "Midway", "8:30pm")
  }

}

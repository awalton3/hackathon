import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-available-groups',
  templateUrl: './available-groups.component.html',
  styleUrls: ['./available-groups.component.css']
})
export class AvailableGroupsComponent implements OnInit {

  currUserID = sessionStorage.getItem('userID')

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {

    //Get User from fb collection
    this.dbService.getUser(this.currUserID).subscribe(user => {
      console.log(user.data())
    })

    //Create a Group if needed
    //this.dbService.createGroup(currUserID, "8:30pm", "ND", "Midway" )


    //Testing

  //  creatorID, time, origin, dest


  //  this.dbService.createGroup(currUser, "8:30pm", )
  }

}

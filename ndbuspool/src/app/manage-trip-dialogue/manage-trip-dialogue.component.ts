import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderToolbarComponent } from '../header-toolbar/header-toolbar.component';
import { FormGroup, FormControl } from '@angular/forms';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-manage-trip-dialogue',
  templateUrl: './manage-trip-dialogue.component.html',
  styleUrls: ['./manage-trip-dialogue.component.css']
})
export class ManageTripDialogueComponent implements OnInit {

  tripForm: FormGroup = new FormGroup({})
  initialTripInfo: any;

  constructor(
    public dialogRef: MatDialogRef<HeaderToolbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dbService: DatabaseService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initForm()
    this.dbService.getUser(sessionStorage.getItem("userID"))
      .subscribe(userObj => {
        this.initialTripInfo = {
          fromND: userObj.data().req_nd_dep,
          fromAirport: userObj.data().req_airport_dep
        }
        this.initFormWithValues();
      })
  }

  initForm() {
    this.tripForm = new FormGroup({
      'toAirportDate': new FormControl(null),
      'toAirportTime': new FormControl(null),
      'toAirportLocation': new FormControl(null),
      'fromAirportDate': new FormControl(null),
      'fromAirportTime': new FormControl(null),
      'fromAirportLocation': new FormControl(null),
    })
  }

  initFormWithValues() {
    this.tripForm = new FormGroup({
      'toAirportDate': new FormControl(this.initialTripInfo.fromND.date),
      'toAirportTime': new FormControl(this.initialTripInfo.fromND.time),
      'toAirportLocation': new FormControl(this.initialTripInfo.fromND.location),
      'fromAirportDate': new FormControl(this.initialTripInfo.fromAirport.date),
      'fromAirportTime': new FormControl(this.initialTripInfo.fromAirport.time),
      'fromAirportLocation': new FormControl(this.initialTripInfo.fromAirport.location),
    })
  }

  updateTrip() {
    console.log(this.tripForm.value)
    let fromND = { location: null, date: this.tripForm.value.toAirportDate, time: this.tripForm.value.toAirportTime }
    let fromAirport = { location: null, date: this.tripForm.value.fromAirportDate, time: this.tripForm.value.fromAirportTime }
    this.dbService.setTrip(sessionStorage.getItem("userID"), fromND, fromAirport)
      .then(response => this.dialogRef.close())
      .catch(error => console.log("Error setting trip times:", error))
  }

}

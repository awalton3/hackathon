import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

//DatabaseService class
export class DatabaseService {

  constructor(private db: AngularFirestore){

  }

  //function for creating user
  createUser(userID, name) {
    this.db.collection("Users").doc(userID).set({
      name: name,
      userId: userID,
      req_nd_dep: { location: 'ND', time: null},
      req_airport_dep: { location: null, time: null },
      curr_to_nd_group:null,
      curr_to_airport_group:null,
    })
    .then(response => {
      console.log("User successfully created.")
    })
    .catch(error => {
      console.log("Error creating user:", error)
    })
  }

  getUser(userID) {
    console.log(userID)
    return this.db.collection("Users").doc(userID).get()
  }

  //function for creating a group
  createGroup(creatorID, time, origin, dest){
    this.db.collection("Groups").add({
      time: time,
      memberList: [ creatorID ],
      origin: origin,
      dest: dest
      //price: price
    })
  }
  //function for setting trip, takes in { location: location, time: time }
  setTrip(userID, req_nd_dep, req_airport_dep) {
    this.db.collection("Users").doc(userID).update({
      rep_airport_dep: req_airport_dep,
      rep_nd_dep: req_nd_dep
    })
    .then(response => {
      console.log("Trip departure times set successfully.")
    })
    .catch(error => {
      console.log("Error setting trip times:", error)
    })
  }

  //function to delete trip
  deleteTrip(userID, group_ID){


    //check group table to delte user from that group
  }


}

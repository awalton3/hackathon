import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({ providedIn: 'root' })

export class DatabaseService {

  constructor(private db: AngularFirestore) { }


  /* USER */

  createUser(userID: string, name: any) {
    this.db.collection("Users").doc(userID).set({
      name: name,
      userId: userID,
      req_nd_dep: { location: 'ND', time: null }, //TO AIRPORT
      curr_to_airport_group: null, //Current To Aiport Group
      req_airport_dep: { location: null, time: null }, //FROM AIRPORT
      curr_to_nd_group: null, //Current From Airport Group
    })
      .then(() => console.log("User successfully created."))
      .catch(error => console.log("Error creating user:", error))
  }

  getUser(userID: string) {
    console.log(userID)
    return this.db.collection("Users").doc(userID).get()
  }

  /* GROUPS */

  createGroup(creatorID: string, time: string, origin: string, dest: string, limit: number) {

    // Construct key
    let groupID = this.db.createId();
    console.log(groupID.length)

    let documentKey = groupID + origin + dest;

    this.db.collection("Groups").doc(documentKey).set({
      time: time,
      memberList: [creatorID],
      origin: origin,
      dest: dest,
      limit: limit
    })
      .then(() => console.log("Group successfully created!"))
      .catch(error => console.log(error))
  }

  getGroup(groupID) {
    return this.db.collection("Groups").doc(groupID).get()
  }

  fetchGroups(origin: string, dest: string, time) {

    let targetKey = ''

    firebase.firestore().collection('Groups')
      .where(firebase.firestore.FieldPath.documentId().toString().substring(19), '==', targetKey)
      .get()
      .then(res => {
        console.log(res)
      })
  }

  joinGroup(userID: string, groupID: string) {

    //Update Groups collection
    return new Promise(resolve => {

      this.getGroup(groupID).subscribe(group => {

        //Add user to memberList
        let newMemberList = group.data().memberList
        // newMemberList.push(userID)

        //ADD BACK IN
        if (!newMemberList.some(existingUid => existingUid == userID)) {
          newMemberList.push(userID)
        } else {
          console.log("Error: You cannot join a group you are already in!")
        }

        // Update Groups database with new list
        let task1 = this.db.collection("Groups").doc(groupID).update({ memberList: newMemberList })
          .then(() => Promise.resolve(group))
          .catch(error => Promise.reject(error))

        // Update Users database
        let task2 = this.onJoinGroup_UpdateUserColl(group, groupID, userID)
          .then(() => Promise.resolve("Successfully added user to User collection"))
          .catch(error => Promise.reject(error))

        resolve(Promise.all([task1, task2]))
      })
    })
  }

  onJoinGroup_UpdateUserColl(group, groupID: string, userID: string) {

    let dataToWrite = {}

    if (group.data().origin == "ND") {
      dataToWrite = { curr_to_airport_group: groupID }
    } else {
      dataToWrite = { curr_to_nd_group: groupID }
    }

    return this.db.collection("Users").doc(userID).update(dataToWrite)
  }



  // onJoinGroup_UpdateGroupColl(groupID: string, userID: string) {
  //
  //   //Update Groups collection
  //   this.getGroup(groupID).subscribe(group => {
  //
  //     //Add user to memberList
  //     let newMemberList = group.data().memberList
  //     if (!newMemberList.some(existingUid => existingUid == userID)) {
  //       newMemberList.push(userID)
  //     } else {
  //       console.log("Error: You cannot join a group you are already in!")
  //     }
  //
  //     // Update database
  //     this.db.collection("Groups").doc(groupID).update({ memberList: newMemberList })
  //       .then(() => Promise.resolve(group))
  //       .catch(error => Promise.reject(error))
  //   })
  //
  // }























  /* TRIP */

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
  deleteTrip(userID, group_ID) {
    //check group table to delte user from that group
  }


}

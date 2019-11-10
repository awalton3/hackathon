import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Query } from '@firebase/firestore-types'



@Injectable({ providedIn: 'root' })

export class DatabaseService {

  constructor(private db: AngularFirestore) { }


  /* USER--------------------------------------------------------------------------------*/
  createUser(userID: string, name: any) {
    this.db.collection("Users").doc(userID).set({
      name: name,
      userId: userID,

      req_nd_dep: { location: null, date: null, time: null }, //TO AIRPORT
      req_airport_dep: { location: null, date: null, time: null }, //FROM AIRPORT

      curr_to_airport_group: null, //Current To Aiport Group
      curr_to_nd_group: null, //Current From Airport Group
    })
      .then(() => console.log("User successfully created."))
      .catch(error => console.log("Error creating user:", error))
  }

  getUser(userID: string) {
    return this.db.collection("Users").doc(userID).get()
  }

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


  //function to update user trip
  updateTrip(userID, new_nd, new_airport){

    return new Promise(resolve => {
       this.getUser(userID).subscribe(user => {

         let curr_nd_group= user.data().curr_to_nd_group
         let curr_airport_group= user.data().curr_to_airport_group
         let old_nd = user.data().req_nd_dep
         let old_airport= user.data().req_airport_dep

         //check to see if user needs to be removed from groups
         if(old_nd != null && new_nd == null){
           this.leaveGroup(userID,curr_nd_group)
         }
         if(old_airport != null && new_airport == null){
           this.leaveGroup(userID, curr_airport_group)

          //set new trip values
          this.setTrip(userID, new_nd, new_airport)
         }


       })
    })


  }

  //function to delete trip
  deleteTrip(userID) {
    //check group table to delete user from that group
    //Update Groups collection
    return new Promise(resolve => {
      this.getUser(userID).subscribe(userInfo => {

        //delete user from memberList
        let nd_group_id = userInfo.data().curr_nd_group
        let airport_group_id = userInfo.data().curr_airport_group

        this.leaveGroup(userID,nd_group_id)
        this.leaveGroup(userID,airport_group_id)

        })
        //delete trip info from user component
        this.setTrip(userID, null, null)
      })

  }

  /* GROUPS-------------------------------------------------------------------------------- */
  createGroup(creatorID: string, date, time, origin: string, dest: string, limit: number) {

    // Construct key
    let groupID = this.db.createId();
    console.log(groupID.length)

    let documentKey = groupID //+ origin + dest;

    this.db.collection("Groups").doc(documentKey).set({
      date: date,
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

//TODO: make this a listener so as to avoid deadlock in terms of deleting groups
  deleteGroup(groupID){
    this.db.collection("Groups").doc(groupID).delete()
    .then(() => console.log("Group successfully deleted."))
    .catch(error => console.log(error))
  }

  leaveGroup(userID,groupID){

    //Update Groups collection
    return new Promise(resolve => {
      this.getGroup(groupID).subscribe(group => {

        //delete user from memberList
        let oldMemberList = group.data().memberList
        for (var i = oldMemberList.length; i--;) {
          if (oldMemberList[i] === userID) {
            oldMemberList.splice(i, 1);
          }
        }
        let newMemberList = oldMemberList

        //check to see if empty
        if(newMemberList.length ==0){
          //delete group
          this.deleteGroup(groupID)
        } else{
          //update group with new list
          let task1 = this.db.collection("Groups").doc(groupID).update({ memberList: newMemberList })
            .then(() => Promise.resolve(group))
            .catch(error => Promise.reject(error))

          // Update Users database
          let task2 = this.onJoinGroup_UpdateUserColl(group, groupID, userID)
            .then(() => Promise.resolve("Successfully added user to User collection"))
            .catch(error => Promise.reject(error))

          resolve(Promise.all([task1, task2]))
          }
        })
      })

  }

  fetchGroups(origin: string, dest: string, date) {
    let query: Query = firebase.firestore().collection("Groups")
    query = query.where("origin", "==", origin)
    query = query.where("dest", "==", dest)
    query = query.where("date", "==", date)
    return query.get()
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


}

import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(private router: Router) { }

  register(email, password, username) {
    console.log(username, email, password)
    //contacting firebase over the web (like and HTTP requset); asynchronous function call
    //this asynchonous function returns a promise (you are guaranteed a response whether it fails or not)
    //
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userObj => { //.then waits for response
        this.router.navigate(['/login'])
        //this.userService.addUserToFbCollect(this.createNewUserObj(userObj,formData))
      })
      .catch(error => { // to account for errors in request/promise
        console.log(error)
      })

  }

  login(email, password) {

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userObj => {
          console.log(userObj)
          sessionStorage.setItem('email', email)
          this.router.navigate(['/home'])
        }).catch(error => this.handleError(error.code))
    }

    handleError(errorCode: any) {

      switch (errorCode) {

        //login
        case 'auth/invalid-email':
          console.log('Your email is invalid.')
          break;
        case 'auth/user-disabled':
          console.log('Your account is disabled.')
          break;
        case 'auth/user-not-found':
          console.log('Your email is not registered.')
          break;
        case 'auth/wrong-password':
          console.log('Your password is invalid.')
          break;

        //register
        case 'auth/email-already-in-use':
          console.log('Email already in use')
          break;
        case 'auth/invalid-email':
          console.log('Email address is invalid')
          break;
        case 'auth/operation-not-allowed':
          console.log('Operation not allowed');
          break;
        case 'auth/weak-password':
          console.log('Password is weak');
          break;

        //reset
        case 'auth/invalid-email':
          console.log('Email invalid');
          break;
        case 'auth/user-not-found':
          console.log('No user found');
          break;

      }
    }

  }

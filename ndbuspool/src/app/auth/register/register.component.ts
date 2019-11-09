import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup; //creating register form of type FormGroup
  constructor() { }

  ngOnInit() {
    //here is where we call initForm
    this.initForm()
  }

  //initForm function
  initForm(){
    this.registerForm = new FormGroup({
      //where we do form controls
      'email': new FormControl(null), //adds a reference of form field here so it can be accessed
      'password': new FormControl(null),
      'username': new FormControl(null)

    }) //instantiating new FormGroup

  }
}

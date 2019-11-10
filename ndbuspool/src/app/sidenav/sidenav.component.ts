import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  links = ['FIND A RIDE', 'CURRENT RIDES', 'BUS SCHEDULE', 'SETTINGS']

  constructor() { }

  ngOnInit() {

  }

}

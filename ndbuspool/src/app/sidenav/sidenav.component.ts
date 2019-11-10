import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  constructor(private router: Router) { }

  links = ['FIND A RIDE', 'CURRENT RIDES', 'BUS SCHEDULE', 'SETTINGS']
  username = sessionStorage.getItem('username')

  routeToOtherLinks(link) {
    if (link == "FIND A RIDE") {
      this.router.navigate(['/groups'])
    } else if (link == "CURRENT RIDES") {
      this.router.navigate(['/groups'])
    } else if (link == "BUS SCHEDULE") {
      this.router.navigate(['/groups'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
  }

}

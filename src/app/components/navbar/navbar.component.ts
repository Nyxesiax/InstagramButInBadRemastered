import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../Service/authentication.service";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  searchterm: string;
  /*

    startAt = new Subject();
    endAt = new Subject();

    clubs;
    allclubs;

    startobs = this.startAt.asObservable();
    endobs = this.endAt.asObservable(); */
  constructor(public authService: AuthenticationService) {
    this.searchterm = '';

  }
/*
  signOut() {
    this.authService.signOut();
  }


 */
  isAuthenticated() {
    // console.log(this.authService.isAuthenticated());
    //return this.authService.isAuthenticated();
  }

  /*
  getUserOfPost() {
    this.userService.ownerOfPost = this.user.email;
    // this.router.navigateByUrl('/userProfile');
  }
*/


  ngOnInit() {
  }
/*
  search() {
    console.log(this.searchterm);
    this.userService.ownerOfPost = this.searchterm;
    this.searchterm = '';
    this.router.navigateByUrl('/userProfile');
  }

 */
}


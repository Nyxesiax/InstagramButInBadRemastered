import { Component, OnInit } from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UsersService} from "../../Service/userService/users.service";


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
  constructor(public usersService: UsersService, public router: Router) {
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

  logout() {
    localStorage.clear();
    this.router.navigate(['/loginWindow']);
  }
}


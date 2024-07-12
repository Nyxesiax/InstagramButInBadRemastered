import { Component, OnInit } from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UsersService} from "../../Service/userService/users.service";
import {CreatePostComponent} from "../create-post/create-post.component";
import {AuthenticationService} from "../../Service/authenticationService/authentication.service";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, CreatePostComponent, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  searchterm: string;
  postToggle: boolean;

  constructor(public usersService: UsersService,
              public router: Router,
              private authService: AuthenticationService) {
    this.searchterm = '';
    this.postToggle = false;
  }

  ngOnInit() {

  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/loginWindow']);
  }
}


import { Component, OnInit } from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UsersService} from "../../Service/userService/users.service";
import {CreatePostComponent} from "../create-post/create-post.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, CreatePostComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  searchterm: string;
  postToggle: boolean;
  loggedIn : boolean;

  constructor(public usersService: UsersService, public router: Router) {
    this.searchterm = '';
    this.postToggle = false;
    this.loggedIn = true;
  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/loginWindow']);
  }
}


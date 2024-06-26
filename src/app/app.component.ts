import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginComponent} from "./components/loginWindow/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {NgIf} from "@angular/common";
import {CreatePostComponent} from "./components/create-post/create-post.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent, DashboardComponent, SidebarComponent, NgIf, CreatePostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstagramButInBadRemastered';
  constructor()
  {
  }




}

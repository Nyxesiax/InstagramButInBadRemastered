import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginComponent} from "./components/loginWindow/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {NgIf} from "@angular/common";
import {CreatePostComponent} from "./components/create-post/create-post.component";
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent, DashboardComponent, NgIf, CreatePostComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstagramButInBadRemastered';
  constructor()
  {
  }




}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginComponent} from "./components/loginWindow/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthenticationService} from "./Service/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstagramButInBadRemastered';
}

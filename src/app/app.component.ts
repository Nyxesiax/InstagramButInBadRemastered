import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginComponent} from "./components/loginWindow/login.component";
import {DashbardComponent} from "./components/dashbard/dashbard.component";
import {AuthenticationService} from "./Service/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent, DashbardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstagramButInBadRemastered';
}

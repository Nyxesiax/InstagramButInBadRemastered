import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/loginWindow/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RegisterComponent} from "./components/registerWindow/register.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

export const routes: Routes = [{
  path: "",
  redirectTo: "loginWindow",
  component: LoginComponent},
  {
    path: "loginWindow",
    component: LoginComponent},
  {
    path: "dashboard",
    component: DashboardComponent},
  {
    path: "registerWindow",
    component: RegisterComponent},
  {
    path: "userProfile",
    component: UserProfileComponent
}];
  }];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  bootstrap: []
})export class AppModule { }

import { Routes } from '@angular/router';
import {LoginComponent} from "./components/loginWindow/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RegisterComponent} from "./components/registerWindow/register.component";

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
    component: RegisterComponent
  }];

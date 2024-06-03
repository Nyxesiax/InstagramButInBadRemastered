import { Routes } from '@angular/router';
import {LoginComponent} from "./components/loginWindow/login.component";
import {DashbardComponent} from "./components/dashbard/dashbard.component";
import {RegisterComponent} from "./components/registerWindow/register.component";

export const routes: Routes = [{
  path: "",
  component: LoginComponent},
  {
    path: "loginWindow",
    component: LoginComponent},
  {
    path: "dashboard",
    component: DashbardComponent},
  {
    path: "registerWindow",
    component: RegisterComponent
  }];

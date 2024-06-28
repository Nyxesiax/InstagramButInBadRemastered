import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {AuthenticationService} from "./Service/authentication.service";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), AuthenticationService]
};

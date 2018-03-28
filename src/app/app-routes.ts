import { Routes, RouterLink } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import {LoginComponent} from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

export const APP_ROUTES: Routes = [
    {path: 'SignUp', component: SignUpComponent},
    {path: 'Login', component: LoginComponent},
    {path: 'Profile', component: ProfileComponent}
];

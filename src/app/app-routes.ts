import { Routes, RouterLink } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import {LoginComponent} from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
export const APP_ROUTES: Routes = [
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'upelection', component: UpelectionComponent},
    {path: '', component: HomePageComponent},
    {path: '**', component: HomePageComponent}
];

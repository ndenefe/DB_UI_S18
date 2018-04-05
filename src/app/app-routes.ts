import { Routes, RouterLink } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import {LoginComponent} from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {HomePageComponent} from './home-page/home-page.component';
import {UpelectionComponent} from './upelection/upelection.component';

export const APP_ROUTES: Routes = [
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'upelection', component: UpelectionComponent},
    {path: '', component: HomePageComponent},
    {path: '**', component: HomePageComponent}
];

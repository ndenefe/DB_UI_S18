import { Routes, RouterLink } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import {LoginComponent} from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {HomePageComponent} from './home-page/home-page.component';
import {UpelectionComponent} from './upelection/upelection.component';
import { UpdtLoginComponent } from './update/updtLogin/updtLogin.component';
import { UpdtProfileComponent } from './update/updtProfile/updtProfile.component';

export const APP_ROUTES: Routes = [
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'upelection', component: UpelectionComponent},
    {path: 'update_login', component: UpdtLoginComponent},
    {path: 'update_profile', component: UpdtProfileComponent},
    {path: '', component: HomePageComponent},
    {path: '**', component: HomePageComponent}
];

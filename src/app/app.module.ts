import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {APP_ROUTES} from './app-routes';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ProfileComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      APP_ROUTES,
      {enableTracing: true}
  )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

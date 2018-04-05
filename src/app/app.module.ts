import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {APP_ROUTES} from './app-routes';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UpelectionComponent } from './upelection/upelection.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ProfileComponent,
    UpelectionComponent
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

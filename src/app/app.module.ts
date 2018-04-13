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
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { UpdateModule} from './update/update.module';
import { DomainModule } from './domain';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ProfileComponent,
    UpelectionComponent,
    HomePageComponent,
    RegisterComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    UpdateModule,
    DomainModule,
    RouterModule.forRoot(
      APP_ROUTES,
      {enableTracing: true}
  )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

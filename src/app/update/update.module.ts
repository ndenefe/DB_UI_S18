import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {APP_ROUTES} from '../app-routes';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import { UpdtLoginComponent } from './updtLogin/updtLogin.component';
import { UpdtProfileComponent } from './updtProfile/updtProfile.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(
      APP_ROUTES,
      {enableTracing: true}
  )

  ],
  declarations: [UpdateComponent,
    UpdtLoginComponent,
    UpdtProfileComponent
],
exports: [
  UpdateComponent,
  UpdtLoginComponent ,
  UpdtProfileComponent 

]
})
export class UpdateModule { }

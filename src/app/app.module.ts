import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccountEditorComponent } from './account-editor/account-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountEditorComponent
],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

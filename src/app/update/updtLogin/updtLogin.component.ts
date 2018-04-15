import { Component, OnInit } from '@angular/core';
import { Login } from './../../domain/models/login';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-updtLogin',
  templateUrl: './updtLogin.component.html',
  styleUrls: ['./updtLogin.component.css']
})
export class UpdtLoginComponent implements OnInit {

    public logins: Login[];

    public newLogin: Login;

    public userCheck: boolean = false;

    public passCheck: boolean = false;

    public reset: boolean = false;

    public passwordCheck: string;

    public checkPassMatch: boolean = true;

    constructor() {}

    ngOnInit() {
      this.logins = [];
      this.newLogin = {};
    }

    //need to add navbar to the page and add this to navbar

    // need to load in username automatically

    //need to make changes to db on save 
    
    public resetLogin() {
      if (this.reset) {
        this.userCheck = false;
        this.passCheck = false;
        this.checkPassMatch = true;
      }
      if (!this.newLogin.password) {
        this.passCheck = true;
      }
      if (!this.newLogin.username) {
        this.userCheck = true;
      }
      if (this.passCheck === true || this.userCheck === true) {
        this.reset = true;
        this.newLogin = {};
      }
      else if (this.passwordCheck != this.newLogin.password)
      {
        this.checkPassMatch = false;
        this.reset = true;
      }
      else {
        this.logins.push(this.newLogin);
      }
      this.newLogin = {};
      this.passwordCheck = "";
    }

}

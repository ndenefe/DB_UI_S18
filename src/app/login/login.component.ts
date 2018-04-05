import { Component, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { Login } from './../domain/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    public logins: Login[];

    public newLogin: Login;

    public userCheck: boolean = false;

    public passCheck: boolean = false;

    public reset: boolean = false;

    constructor() {}

    ngOnInit() {
      this.logins = [];
      this.newLogin = {};
    }

    public login() {
      if (this.reset) {
        this.userCheck = false;
        this.passCheck = false;
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
      else {
        this.logins.push(this.newLogin);
        this.newLogin = {};
      }
    }
}

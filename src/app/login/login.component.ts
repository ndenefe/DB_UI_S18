import { Component, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { Login, Account, Account2 } from '../domain';
import { TestRepository } from '../domain/repositories/test-repository.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// need to check db to login then route to profile page on a login and
// have the profile info load automatically for the user

export class LoginComponent implements OnInit {

    public logins: Account2[];

    public newLogin: Login;

    public userCheck = false;

    public passCheck = false;

    public reset = false;

    constructor(private testRepository: TestRepository) {}

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
      } else {
        this.testRepository.login(this.newLogin).subscribe(x => this.logins.push(x));
        this.newLogin = {};
      }
    }
}

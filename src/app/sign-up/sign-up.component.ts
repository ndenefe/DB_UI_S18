import { Phone } from './../domain/models/phone';
import { Component, OnInit } from '@angular/core';
import { Account } from '../domain/models/account';
import { Department } from '../domain/models/department';
import { Router, RouterLink} from '@angular/router';
import { Login } from './../domain/models/login';
import { Website } from './../domain/models/website';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

//need to add to db on a valid save and the route to the profile page with the 
//users info automatically loaded

//needs better validation

export class SignUpComponent implements OnInit {

  public title: string;

  public account: Account;

  public accounts: Account[];

  public departments: Department[];

  public newPhone: Phone;

  public loginInfo: Login[];

  public signUp: Login;

  public passCheck: string;

  public checkPassMatch: boolean = true;

  public reset: boolean = false;

  constructor() { }

  ngOnInit() {
    this.title = 'Sign Up';

    this.loginInfo = [];

    this.signUp = {};

    this.account = {
      name: '',
      phoneNumbers: [],
      login: []
    };

    this.departments = [
      { id: 0, name: 'Democrat' },
      { id: 1, name: 'Republican' },
      { id: 2, name: 'Libertarian' },
      { id: 3, name: 'Green Party' },
      { id: 4, name: 'Other' }
    ];

    this.accounts = [];

    this.newPhone = {};
  }

  public addPhone() {
    if (!this.newPhone.type)
    {
      this.newPhone.type = "None";
    }
    this.account.phoneNumbers.push(this.newPhone);
    this.newPhone = {};
  }

  public deleteFieldValue(index) {
    this.account.phoneNumbers.splice(index, 1);
  }

  public saveProfile() {
    if (!this.account.isEmployee)
    {
      this.account.departmentId = null;
    }
    if (!this.account.hasWebsite)
    {
      this.account.website = null;
    }
    if (this.reset)
    {
      this.checkPassMatch = true;
    }
    if (this.passCheck != this.signUp.password)
    {
      this.checkPassMatch = false;
      this.reset = true;
    }
    else
    {
      this.account.login.push(this.signUp);
      this.loginInfo.push(this.signUp);
      this.accounts.push(this.account);
    }
    this.account = {
      name: '',
      phoneNumbers: []
    };
    this.newPhone = {};
    this.signUp = {};
    this.passCheck = "";
  }

}

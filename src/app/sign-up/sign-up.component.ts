import { Phone } from './../domain/models/phone';
import { Component, OnInit } from '@angular/core';
import { Account } from '../domain/models/account';
import { Department } from '../domain/models/department';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public title: string;

  public account: Account;

  public accounts: Account[];

  public departments: Department[];

  public newPhone: Phone;

  constructor() { }

  ngOnInit() {
    this.title = 'Sign Up';
    this.account = {
      name: '',
      phoneNumbers: []
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
    this.accounts.push(this.account);

    this.account = {
      name: '',
      phoneNumbers: []
    };

    this.newPhone = {};
  }

}

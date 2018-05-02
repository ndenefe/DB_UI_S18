import { Phone } from './../domain/models/phone';
import { Component, OnInit } from '@angular/core';
import { Account } from '../domain/models/account';
import { Department } from '../domain/models/department';
import { Router, RouterLink} from '@angular/router';
import { Register } from './../domain/models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public title: string;

  public number: number;

  public currentNum: number;

  public account: Account;

  public accounts: Account[];

  public departments: Department[];

  public newPhone: Phone;

  public registers: Register[];

  public register: Register;

  public passCheck: string;

  public checkPassMatch = true;

  public reset = false;

  constructor() { }

  ngOnInit() {
    this.currentNum = 0;

    this.number = 30;

    this.title = 'Register';

    this.registers = [];

    this.register = {};

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
    if (!this.newPhone.type) {
      this.newPhone.type = 'None';
    }
    this.account.phoneNumbers.push(this.newPhone);
    this.newPhone = {};
  }

  public deleteFieldValue(index) {
    this.account.phoneNumbers.splice(index, 1);
  }

  public saveProfile() {
    this.register.slot = this.currentNum + 1;
    if (!this.account.isEmployee) {
      this.account.departmentId = null;
    }
    if (!this.account.hasWebsite) {
      this.account.website = null;
    }
    if (this.reset) {
      this.checkPassMatch = true;
    } else {
      this.registers.push(this.register);
      this.accounts.push(this.account);
    }
    this.account = {
      name: '',
      phoneNumbers: []
    };

    this.newPhone = {};
    this.register = {};
    this.passCheck = '';
    this.currentNum += 1;

    this.number = 30 - this.currentNum;
  }

}

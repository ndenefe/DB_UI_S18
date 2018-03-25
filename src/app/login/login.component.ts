import { Phone } from './../domain/models/phone';
import { Component, OnInit } from '@angular/core';
import { Account } from '../domain/models/account';
import { Department } from '../domain/models/department';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public title: string;

  public account: Account;

  public departments: Department[];

  public newPhone: Phone;

  constructor() { }

  ngOnInit() {
    this.title = 'Login';
    this.account = {
      name: 'Patrick',
      phoneNumbers: [
        { number: "214-545-1232", type: "mobile" }
      ]
    };
    this.departments = [
      { id: 0, name: 'Democrat' },
      { id: 1, name: 'Republican' },
      { id: 2, name: 'Libertarian' },
      { id: 3, name: 'Green Party' },
      { id: 4, name: 'Other' }
    ];

    this.newPhone = {};
  }

  public addPhone(){
    this.account.phoneNumbers.push(this.newPhone);
  }
  
}

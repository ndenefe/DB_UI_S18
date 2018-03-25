import { Phone } from './../domain/models/phone';
import { Component, OnInit } from '@angular/core';
import { Account } from '../domain/models/account';
import { Department } from '../domain/models/department';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.css']
})
export class AccountEditorComponent implements OnInit {

  public title: string;

  public account: Account;

  public departments: Department[];

  public newPhone: Phone;

  constructor() { }

  ngOnInit() {
    this.title = 'Account Editor';
    this.account = {
      name: 'John',
      phoneNumbers: [
        { number: "214-545-1232", type: "mobile" },
        { number: "214-333-2221", type: "home" },
        { number: "817-444-2322", type: "work" },
        { number: "213-444-2223", type: "fax" }
      ]
    };
    this.departments = [
      { id: 1, name: 'HR' },
      { id: 2, name: 'Marketing' },
      { id: 3, name: 'IT' }
    ];

    this.newPhone = {};
  }

  public addPhone(){
    this.account.phoneNumbers.push(this.newPhone);
  }
}

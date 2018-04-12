import { Phone } from '../../domain/models/phone';
import { Component, OnInit } from '@angular/core';
import { Account } from '../../domain/models/account';
import { Department } from '../../domain/models/department';
import { Router, RouterLink} from '@angular/router';
import { Website } from '../../domain/models/website';

//needs to load in profile info at start

//needs to change info in the db on save

//need to add navbar to the page and add this to navbar

//need to add beter validation on this and sign up

//add an alert message saying profile was updated if sucessful

@Component({
  selector: 'app-updtProfile',
  templateUrl: './updtProfile.component.html',
  styleUrls: ['./updtProfile.component.css']
})
export class UpdtProfileComponent implements OnInit {

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
    else
    {
      this.accounts.push(this.account);
    }
    this.account = {
      name: '',
      phoneNumbers: []
    };
    this.newPhone = {};
  }

}



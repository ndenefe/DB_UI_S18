import { Component, OnInit } from '@angular/core';
import { Login } from './../../domain/models/login';
import { Router, RouterLink} from '@angular/router';
import {SharedService} from "../../domain";
import {Account2} from '../../domain';
import { TestRepository } from '../../domain';

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

    public accounts: Account2;

    public acc: Account2;

    constructor(private testRepository: TestRepository,
      private sharedService: SharedService) {}

    ngOnInit() {
      this.accounts = this.sharedService.account;
      this.logins = [];
      this.newLogin = {};
      this.newLogin.username = this.accounts.username;
    }
    
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
        this.accounts.password = this.newLogin.password;
        this.accounts.username = this.newLogin.username;
        if(this.accounts.polId)
        {
          this.testRepository.updtLoginPol(this.accounts).subscribe(x => {});
        }
        else
        {
          this.testRepository.updtLoginNonPol(this.accounts).subscribe(x => {});
        }
        this.sharedService.insertData(this.accounts);
      }
      this.acc = this.sharedService.account;
      this.newLogin = {};
      this.passwordCheck = "";
    }

}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Tenure, Phone, Department, Account2, Login } from './../domain';
import { TestRepository } from '../domain/repositories/test-repository.service';
import { SharedService } from "../domain";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

//add phone number validation and pipe stuff

export class SignUpComponent implements OnInit {

  public title: string;

  public account: Account2;

  public accounts: Account2[];

  public departments: Department[];

  public passCheck: string;

  public tenNumber: number;

  public tenure: Tenure[];

  public isPol: boolean;

  public newLogin: Login;

  public ldata: Account2;

  constructor(private testRepository: TestRepository,
    private sharedService: SharedService,
  public router: Router) { }

  ngOnInit() {
    this.title = 'Sign Up';

    this.account = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      partyId: null,
      website: ''
    };

    this.accounts = [];

    this.tenNumber = null;

    this.departments = [
      { id: 0, name: 'Democrat' },
      { id: 1, name: 'Republican' },
      { id: 2, name: 'Libertarian' },
      { id: 3, name: 'Green Party' },
      { id: 4, name: 'Other' }
    ];

    this.tenure = [
      { id: 0, name: '0 Years' },
      { id: 1, name: '1 Year' },
      { id: 2, name: '2 Years' },
      { id: 3, name: '3 Years' },
      { id: 4, name: '4 Years' },
      { id: 5, name: '5 Years' },
      { id: 6, name: '6 Years' },
      { id: 7, name: '7 Years' },
      { id: 8, name: '8 Years' },
      { id: 9, name: '9 Years' },
      { id: 10, name: '10 Years' },
      { id: 11, name: 'Over 10 Years' }
    ]
    this.newLogin = {};
  }


  public saveProfile() {
    this.accounts.push(this.account);

    //make put request
    if(this.account.partyId)
    {
      this.testRepository.polSignUp(this.account).subscribe(x =>{});
    }
    else
    {
      this.testRepository.nonPolSignUp(this.account).subscribe(x => {});
    }
    this.sharedService.insertData(this.account);
    //reset data
    this.account = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      partyId: null,
      website: ''
    };
    this.passCheck = "";
    this.router.navigateByUrl('login');
  }

}

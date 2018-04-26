import { Component, OnInit } from '@angular/core';
import {SharedService} from "../domain";
import {Account2} from '../domain';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  public accounts: Account2 = {};

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  // updateL(){
  //   this.accounts = this.sharedService.account;
  //   console.log(this.sharedService.account);
  // }


}

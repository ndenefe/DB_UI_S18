import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {SharedService} from '../domain';
import {Account2} from '../domain';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  public accounts: Account2 = {};

  constructor(public sharedService: SharedService,
  private router: Router) { }

  ngOnInit() {
  }
  zipSearch(search: any) {
    this.router.navigateByUrl(`search/${search}`);
  }

}

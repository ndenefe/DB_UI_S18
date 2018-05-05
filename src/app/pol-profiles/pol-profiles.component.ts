import { SharedService } from './../domain/services/shared.service';
import { Component, OnInit, Input} from '@angular/core';
import { Account2, Politicians } from '../domain/models/';
import { ActivatedRoute, Router } from '@angular/router';
import { TestRepository } from '../domain/repositories/test-repository.service';

@Component({
  selector: 'app-pol-profiles',
  templateUrl: './pol-profiles.component.html',
  styleUrls: ['./pol-profiles.component.css']
})
export class PolProfilesComponent implements OnInit {


  public polAccounts: Account2[];

  public imageName: string;
  public account: Account2;
  public Politicians: Politicians;

  constructor(private testRepository: TestRepository,
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit() {
    this.polAccounts = [];
    this.Politicians = {};
    this.account = this.sharedService.account;
    this.testRepository.getPols().subscribe(x => {
      for (let i = 0; i < x.length; i++) {
        this.polAccounts.push(x[i]);
        }
    });
  }
  addList(first, last) {
    this.Politicians.firstName = first;
    this.Politicians.lastName = last;

    console.log(this.sharedService.polArr);
    console.log(1);
    this.sharedService.insertPol(this.Politicians);
    console.log(this.sharedService.polArr);
    this.Politicians = {};
  }


}

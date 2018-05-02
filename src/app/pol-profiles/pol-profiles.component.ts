import { SharedService } from './../domain/services/shared.service';
import { Component, OnInit, Input} from '@angular/core';
import { Account, Account2 } from '../domain/models/account';
import { ActivatedRoute, Router } from '@angular/router';
import { TestRepository } from '../domain/repositories/test-repository.service';

@Component({
  selector: 'app-pol-profiles',
  templateUrl: './pol-profiles.component.html',
  styleUrls: ['./pol-profiles.component.css']
})
export class PolProfilesComponent implements OnInit {


  public polAccounts: Account2[];
  public aaa: Account2[];

  public imageName: string;
  public account: Account2;

  constructor(private testRepository: TestRepository,
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit() {
    this.polAccounts = [];
    this.testRepository.getPols().subscribe(x => {
      for (let i = 0; i < x.length; i++) {
        this.polAccounts.push(x[i]);
        }
    });
  }


}

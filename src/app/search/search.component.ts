import { Component, OnInit, Input } from '@angular/core';
import { TestRepository } from '../domain/repositories/test-repository.service';
import { Account2 } from '../domain/models/account';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public politicians: Account2[] = [];

  constructor(
    private rep: TestRepository,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRouter.params.subscribe((params: any) => {
      if (params.zip) {
        this.rep.getPolByZip(params.zip).subscribe(x => {
          for (let i = 0; i < x.length; i++) {
            this.politicians.push(x[i]);
          }
        });
      }
    });
    console.log(this.politicians);
  }



}

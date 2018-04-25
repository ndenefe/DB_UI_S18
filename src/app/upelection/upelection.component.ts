import { Account2 } from './../domain/models/account';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { Upelection } from './../domain/models/upelection';
import { TestRepository } from '../domain/repositories/test-repository.service';


@Component({
  selector: 'app-upelection',
  templateUrl: './upelection.component.html',
  styleUrls: ['./upelection.component.css']
})



export class UpelectionComponent implements OnInit {

  public check: Upelection[];
  constructor(private testRepository: TestRepository) {}

  ngOnInit() {
    this.check = [];
    this.getdata();
  }
  getdata() {
    this.testRepository.getdata().subscribe(x => {
      // this.check = x;
       for (let i = 0; i < x.length; i++) {
        this.check.push(x[i]);
        }
    });
  }
}

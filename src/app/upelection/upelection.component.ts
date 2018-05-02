import { Account2 } from './../domain/models/account';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { Upelection } from './../domain/models/upelection';
import { TestRepository } from '../domain/repositories/test-repository.service';
import { InElec } from '../domain/models/inElec';


@Component({
  selector: 'app-upelection',
  templateUrl: './upelection.component.html',
  styleUrls: ['./upelection.component.css']
})



export class UpelectionComponent implements OnInit {

  public check: Upelection[];
  public data: InElec[];
  constructor(private testRepository: TestRepository) {}

  ngOnInit() {
    this.check = [];
    this.data = [];
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
  cleanData() {
    for (let i = 0; i < this.check.length; i++) {
      for (let j = 0; j < this.check.length; j++) {
        let top = this.check[i];
        let bottom = this.check[j];
        if (top.state == bottom.state && top.city == bottom.city && top.position == bottom.position) {

        }
        else {

        }
      }
    }
  }
}

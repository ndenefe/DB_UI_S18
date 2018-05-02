import { TestRepository } from './../domain/repositories/test-repository.service';
import { Upelection } from './../domain/models/upelection';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { InElec } from '../domain/models/inElec';
import { Politicians } from '../domain/models/politicians';
import { Account2 } from './../domain/models/account';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public check: Upelection[];
  public checkTest: InElec[];
  public data: InElec[];
  public store: InElec;
  public elec1: Politicians;
  public elec2: Politicians;
  constructor(private testRepository: TestRepository) {}

  ngOnInit() {
    this.check = [];
    this.checkTest = [];
    this.data = [];
    this.store = {};
    this.elec1 = {};
    this.elec2 = {};
    this.getdata();
  }
  getdata() {
    this.testRepository.getdata().subscribe(x => {
      // this.check = x;
      for (let i = 0; i < x.length; i++) {
        this.check.push(x[i]);
      }
      this.cleanData(this.check);
      this.prepareData(this.check);
    });
  }
  prepareData(temp) {
    for (let x = 0; x < 3; x++) {
      this.checkTest.push(temp[x]);
    }
  }
  cleanData(data) {
    // for (let i = 0; i < data.length - 1; i++) {
      let i = 0;
      while (i < data.length) {
      if (
        data[i].city == data[i + 1].city &&
        data[i].state == data[i + 1].state &&
        data[i].position == data[i + 1].position &&
        data[i].dateTime == data[i + 1].dateTime
      ) {
        this.store.city = data[i].city;
        this.store.position = data[i].position;
        this.store.dateTime = data[i].dateTime;
        this.store.state = data[i].state;
        this.elec1.firstName = data[i].firstName;
        this.elec1.lastName = data[i].lastName;
        this.elec2.firstName = data[i + 1].firstName;
        this.elec2.lastName = data[i + 1].lastName;
        this.store.polis = [];
        this.store.polis.push(this.elec1);
        this.store.polis.push(this.elec2);
        this.elec1 = {};
        this.elec2 = {};
        this.data.push(this.store);
        this.store = {};
        i += 2;
      } else {
        this.store.city = data[i].city;
        this.store.state = data[i].state;
        this.store.position = data[i].position;
        this.store.dateTime = data[i].dateTime;
        this.elec1.firstName = data[i].firstName;
        this.elec1.lastName = data[i].lastName;
        this.store.polis = [];
        this.store.polis.push(this.elec1);
        this.data.push(this.store);
        this.elec1 = {};
        this.store = {};
        i++;
      }
    }
  }
}

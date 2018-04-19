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
  constructor(private testRepository: TestRepository) {}

  ngOnInit() {
    this.getdata();
  }
  getdata() {
    this.testRepository.getdata().subscribe(x => console.log(x));
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { Upelection } from './../domain/models/upelection';


@Component({
  selector: 'app-upelection',
  templateUrl: './upelection.component.html',
  styleUrls: ['./upelection.component.css']
})
export class UpelectionComponent implements OnInit {
  title = 'Upcoming Elections';
  myHero = 'Windstorm';
  constructor() { }

  ngOnInit() {
  }

}

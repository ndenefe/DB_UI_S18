import { Component, OnInit, Input} from '@angular/core';
import { Account } from '../domain/models/account';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()
  public account: Account;
  public name: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap
    .subscribe(params => (
      this.name = params.get('id')
    ));
  }

}

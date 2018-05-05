import { SharedService } from './../domain/services/shared.service';
import { Component, OnInit, Input} from '@angular/core';
import { Account2 } from '../domain/models/account';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()
  public account: Account2;
  public name: string;
  public imageName: string;

  constructor(private route: ActivatedRoute,
     private sharedServ: SharedService) { }

  ngOnInit() {
    this.account = this.sharedServ.account;
    console.log(this.account);
    console.log(this.account.partyId);
    // switch (this.account.partyId) {
    //   case 1:
    //     this.imageName = 'assets/republican.jpg';
    //   break;
    //   case 2:
    //     this.imageName = 'assets/libertarian.png';
    //   break;
    //   case 3:
    //     this.imageName = 'assets/green.jpeg';
    //   break;
    //   case 4:
    //     this.imageName = 'assets/democrat.png';
    //   break;
    //   default:
    //     this.imageName = 'assets/default.jpeg';
    //   break;
    // }
  }

}

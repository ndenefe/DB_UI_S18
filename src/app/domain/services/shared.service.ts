import { Injectable } from '@angular/core';
import { Account2 } from '../../domain';
import { Politicians } from '../models/politicians';

@Injectable()
export class SharedService {
    account: Account2 = {};
    polArr: Politicians[] = [];
    insertData(data: Account2) {
        this.account = {};
        this.account = data;
    }
    insertPol(data: Politicians) {
      console.log(data);
      this.polArr.push(data);
  }
}

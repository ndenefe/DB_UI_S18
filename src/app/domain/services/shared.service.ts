import { Injectable } from '@angular/core';
import {Account2} from '../../domain';
@Injectable()
export class SharedService {
    account: Account2;
    insertData(data: Account2) {
        this.account = {};
        this.account = data;
    }

}

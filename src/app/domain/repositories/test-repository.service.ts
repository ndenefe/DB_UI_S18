import { Injectable} from '@angular/core';
import { Account2 } from '../models/account';
import { Login } from '../models/login';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Upelection } from '../models/upelection';
import { Upelection2 } from '../models/upelection';
import { Repository } from './repository.service';
@Injectable()
export class TestRepository {
   // protected endpoint = 'http://127.0.0.1:3000';
     protected endpoint = 'http://ec2-18-221-132-111.us-east-2.compute.amazonaws.com:3000';

    constructor(private httpClient: HttpClient) {

    }

    public login(creds: Login): Observable<Account2> {
        let body = new HttpParams();
        body = body.set('username', creds.username);
        body = body.set('password', creds.password);
        return this.httpClient.post(`${this.endpoint}/login`, body);
    }

    public getdata(): Observable<any> {
      return this.httpClient.get(`${this.endpoint}/getElections`);
  }
}

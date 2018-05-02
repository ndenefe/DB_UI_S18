import { Injectable} from '@angular/core';
import { Account2 } from '../models/account';
import { Login } from '../models/login';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Upelection } from '../models/upelection';
import { Repository } from './repository.service';
@Injectable()
export class TestRepository {
   // protected endpoint = 'http://127.0.0.1:3000';
    protected endpoint = 'http://ec2-18-221-132-111.us-east-2.compute.amazonaws.com:3000';

    private httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      })
    };

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

    public nonPolSignUp(data: Account2): Observable<any>{
      let body = new HttpParams();
      body = body.set('username', data.username);
      body = body.set('password', data.password);
      body = body.set('email', data.email);
      body = body.set('firstName', data.firstName);
      body = body.set('lastName', data.lastName);
      body = body.set('phone',data.phone);
      return this.httpClient.post(`${this.endpoint}/nonPol`, body);
    }

    public polSignUp(data: Account2): Observable<any>{
      let body = new HttpParams();
      body = body.set('username', data.username);
      body = body.set('password', data.password);
      body = body.set('email', data.email);
      body = body.set('firstName', data.firstName);
      body = body.set('lastName', data.lastName);
      body = body.set('phone',data.phone);
      body = body.set('website',data.website);
      body = body.set('partyId',data.partyId.toString());
      body = body.set('tenure',data.tenure.toString());
      return this.httpClient.post(`${this.endpoint}/pol`, body);
    }

    public updtProfileNonPol(data: Account2): Observable<any> {
      let body = new HttpParams();
      body = body.set('userId', data.userId.toString());
      body = body.set('username', data.username);
      body = body.set('password', data.password);
      body = body.set('email', data.email);
      body = body.set('firstName', data.firstName);
      body = body.set('lastName', data.lastName);
      body = body.set('phone',data.phone);
      return this.httpClient.put(`${this.endpoint}/nonPol/info`, body);
    }

    public updtProfilePol(data: Account2): Observable<any> {
      let body = new HttpParams();
      body = body.set('polId', data.polId.toString());
      body = body.set('email', data.email);
      body = body.set('firstName', data.firstName);
      body = body.set('lastName', data.lastName);
      body = body.set('phone',data.phone);
      body = body.set('partyId', data.partyId.toString());
      body = body.set('website', data.website);
      body = body.set('tenure',data.tenure.toString());
      return this.httpClient.put(`${this.endpoint}/pol/info`, body);
    }

    public updtLoginPol(data: Account2): Observable<any> {
      let body = new HttpParams();
      body = body.set('polId', data.polId.toString());
      body = body.set('username', data.username);
      body = body.set('password', data.password);
      return this.httpClient.put(`${this.endpoint}/pol/creds`, body);
    }

    public updtLoginNonPol(data: Account2): Observable<any> {
      let body = new HttpParams();
      body = body.set('userId', data.userId.toString());
      body = body.set('username', data.username);
      body = body.set('password', data.password);
      return this.httpClient.put(`${this.endpoint}/nonPol/creds`, body);
    }
    public getPolByZip(zip: number): Observable<any> {
      return this.httpClient.get(`${this.endpoint}/pol/${zip}`);
    }
    public getPols(): Observable<any> {
      return this.httpClient.get(`${this.endpoint}/getPol`);
    }
}

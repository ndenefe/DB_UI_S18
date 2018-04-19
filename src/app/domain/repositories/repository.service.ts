import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class Repository<T> {

  protected abstract endPoint;

  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'fvazquez'
    })
  };

  constructor(protected httpClient: HttpClient) {}

  public get(): Observable<T[]> {
    return this.httpClient.get(`${this.endPoint}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public getById(id: number): Observable<T> {
    return this.httpClient.get(`${this.endPoint}/${id}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public add(item: T): Observable<T> {
    return this.httpClient.post(`${this.endPoint}`, item, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public update(id: number, item: T): Observable<T> {
    return this.httpClient.put(`${this.endPoint}/${id}`, item, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public delete(id: number): Observable<T> {
    return this.httpClient.delete(`${this.endPoint}/${id}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}


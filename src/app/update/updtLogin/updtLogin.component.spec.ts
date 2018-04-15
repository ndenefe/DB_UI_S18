/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UpdtLoginComponent } from './updtLogin.component';

describe('UpdtLoginComponent', () => {
  let component: UpdtLoginComponent;
  let fixture: ComponentFixture<UpdtLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdtLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdtLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

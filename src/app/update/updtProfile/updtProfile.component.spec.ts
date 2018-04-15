/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UpdtProfileComponent } from './updtProfile.component';

describe('UpdtProfileComponent', () => {
  let component: UpdtProfileComponent;
  let fixture: ComponentFixture<UpdtProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdtProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdtProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

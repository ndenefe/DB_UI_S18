import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePropComponent } from './profile-prop.component';

describe('ProfilePropComponent', () => {
  let component: ProfilePropComponent;
  let fixture: ComponentFixture<ProfilePropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

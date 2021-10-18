import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofilePageComponent } from './myprofile-page.component';

describe('MyprofilePageComponent', () => {
  let component: MyprofilePageComponent;
  let fixture: ComponentFixture<MyprofilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyprofilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

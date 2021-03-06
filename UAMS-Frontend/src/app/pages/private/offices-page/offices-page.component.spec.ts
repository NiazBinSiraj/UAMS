import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesPageComponent } from './offices-page.component';

describe('OfficesPageComponent', () => {
  let component: OfficesPageComponent;
  let fixture: ComponentFixture<OfficesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

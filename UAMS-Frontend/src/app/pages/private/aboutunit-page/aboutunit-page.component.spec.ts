import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutunitPageComponent } from './aboutunit-page.component';

describe('AboutunitPageComponent', () => {
  let component: AboutunitPageComponent;
  let fixture: ComponentFixture<AboutunitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutunitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutunitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

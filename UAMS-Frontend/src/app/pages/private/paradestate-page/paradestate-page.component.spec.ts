import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParadestatePageComponent } from './paradestate-page.component';

describe('ParadestatePageComponent', () => {
  let component: ParadestatePageComponent;
  let fixture: ComponentFixture<ParadestatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParadestatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParadestatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

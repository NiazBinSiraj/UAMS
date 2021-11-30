import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaakfilesPageComponent } from './daakfiles-page.component';

describe('DaakfilesPageComponent', () => {
  let component: DaakfilesPageComponent;
  let fixture: ComponentFixture<DaakfilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaakfilesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaakfilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

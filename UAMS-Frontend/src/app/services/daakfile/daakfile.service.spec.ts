import { TestBed } from '@angular/core/testing';

import { DaakfileService } from './daakfile.service';

describe('DaakfileService', () => {
  let service: DaakfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaakfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

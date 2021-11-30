import { TestBed } from '@angular/core/testing';

import { ParadestateService } from './paradestate.service';

describe('ParadestateService', () => {
  let service: ParadestateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParadestateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

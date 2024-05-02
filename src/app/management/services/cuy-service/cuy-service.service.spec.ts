import { TestBed } from '@angular/core/testing';

import { CuyServiceService } from './cuy-service.service';

describe('CuyServiceService', () => {
  let service: CuyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AvailabeDateApiService } from './availabe-date-api.service';

describe('AvailabeDateApiService', () => {
  let service: AvailabeDateApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabeDateApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

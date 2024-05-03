import { TestBed } from '@angular/core/testing';

import { HistoryAdviserApiService } from './history-adviser-api.service';

describe('HistoryAdviserApiService', () => {
  let service: HistoryAdviserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryAdviserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

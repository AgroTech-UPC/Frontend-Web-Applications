import { TestBed } from '@angular/core/testing';

import { ResourceBreederApiService } from './resource-breeder-api.service';

describe('ResourceBreederApiService', () => {
  let service: ResourceBreederApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceBreederApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

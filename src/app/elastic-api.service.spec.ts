import { TestBed } from '@angular/core/testing';

import { ElasticApiService } from './elastic-api.service';

describe('ElasticApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElasticApiService = TestBed.get(ElasticApiService);
    expect(service).toBeTruthy();
  });
});

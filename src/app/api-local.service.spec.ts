import { TestBed } from '@angular/core/testing';

import { ApiLocalService } from './api-local.service';

describe('ApiLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiLocalService = TestBed.get(ApiLocalService);
    expect(service).toBeTruthy();
  });
});

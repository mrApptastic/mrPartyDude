import { TestBed } from '@angular/core/testing';

import { AlcoholService } from './alcohol.service';

describe('AlcoholService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlcoholService = TestBed.get(AlcoholService);
    expect(service).toBeTruthy();
  });
});

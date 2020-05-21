import { TestBed } from '@angular/core/testing';

import { AlcoholService} from './alcohol-service';

describe('AlcoholService', () => {
  let service: AlcoholService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlcoholService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

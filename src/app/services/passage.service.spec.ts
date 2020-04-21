import { TestBed } from '@angular/core/testing';

import { PassageService } from './passage.service';

describe('PassageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassageService = TestBed.get(PassageService);
    expect(service).toBeTruthy();
  });
});

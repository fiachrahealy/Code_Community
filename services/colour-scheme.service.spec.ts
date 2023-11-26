import { TestBed } from '@angular/core/testing';
import { ColourSchemeService } from './colour-scheme.service';

describe('ColourSchemeService', () => {
  let service: ColourSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColourSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

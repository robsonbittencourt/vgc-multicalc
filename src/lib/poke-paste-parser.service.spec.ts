import { TestBed } from '@angular/core/testing';

import { PokePasteParserService } from './poke-paste-parser.service';

describe('PokePasteParserService', () => {
  let service: PokePasteParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokePasteParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

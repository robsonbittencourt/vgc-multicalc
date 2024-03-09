import { TestBed } from '@angular/core/testing';

import { DeviceDetectorService } from './device-detector.service';

describe('DeviceDetectorService', () => {
  let service: DeviceDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

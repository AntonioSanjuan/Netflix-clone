import { TestBed } from '@angular/core/testing';
import { ScreenTypes } from 'src/app/models/internal-types/common/screenWidthTypes/screenWidthTypes.model';
import { DeviceService } from './device.service';

describe('DeviceService', () => {
  let service: DeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getScreenSize() initially should return undefined', () => {
    expect(service.getScreenSizeType()).toEqual(ScreenTypes.Computer);
  });

  it('getScreenSize$() initially should return undefined', () => {
    service.getScreenSizeTypeChanges$().subscribe((actual) => {
      expect(actual).toEqual(ScreenTypes.Computer);
    });
  });

  //to-do
  // test mocking different window.innerWidth
});

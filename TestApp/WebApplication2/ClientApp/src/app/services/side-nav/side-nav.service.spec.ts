import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SideNavService } from './side-nav.service';


describe('SideNavService', () => {
  let service: SideNavService;

  let deviceServiceStub;

  let screenSizeTypeValueMock = undefined;
  beforeEach(() => {
    deviceServiceStub = {
      getScreenSizeType: jest.fn(() => screenSizeTypeValueMock ),
      getScreenSizeTypeChanges$: jest.fn(() => of(screenSizeTypeValueMock))
    }
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

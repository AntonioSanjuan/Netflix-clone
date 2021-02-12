import { TestBed } from '@angular/core/testing';

import { LoadingSpinnerService } from './loading-spinner.service';

describe('LoadingSpinnerService', () => {
  let service: LoadingSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('showLoaderSpinner() should throw isLoading$ next', () => {
    const isLoadingSpy = spyOn(service.isLoading$, 'next');

    service.showLoaderSpinner();
    expect(isLoadingSpy).toHaveBeenCalledWith(true);
  });

  it('hideLoaderSpinner() should not throw isLoading$ next if has not been called previously showLoaderSpinner()', () => {
    const isLoadingSpy = spyOn(service.isLoading$, 'next');

    service.hideLoaderSpinner();
    expect(isLoadingSpy).not.toHaveBeenCalled();
  });

  it('hideLoaderSpinner() should throw isLoading$ next if has been called previously showLoaderSpinner()', () => {
    const isLoadingSpy = spyOn(service.isLoading$, 'next');

    service.showLoaderSpinner();
    expect(isLoadingSpy).toHaveBeenCalledWith(true);

    service.hideLoaderSpinner();
    expect(isLoadingSpy).toHaveBeenCalledWith(false);
  });

  it('hideLoaderSpinner() should not throw isLoading$ next if has been called previously showLoaderSpinner() more than once', () => {
    const isLoadingSpy = spyOn(service.isLoading$, 'next');

    service.showLoaderSpinner();
    service.showLoaderSpinner();
    expect(isLoadingSpy).toHaveBeenCalledTimes(2);

    service.hideLoaderSpinner();
    expect(isLoadingSpy).not.toHaveBeenCalledWith(false);
  });

});

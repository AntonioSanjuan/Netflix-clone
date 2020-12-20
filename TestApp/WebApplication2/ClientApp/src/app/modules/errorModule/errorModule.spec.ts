import { HttpErrorResponse } from '@angular/common/http';

import { IGenericError } from 'src/app/models/common/errors/genericError.model';
import { ErrorModule } from './errorModule';

describe('[UnitTesting] errorModule', () => {
    const httpErrorResponse = {message: 'mockedMessage', status: 123, error: {}} as HttpErrorResponse;
    afterEach(() => { });

    it('createHttpClientSideGenericError return minimized copy of HttpErrorResponse', () => {
        const expected = { errorCode: -1, errorMessage: httpErrorResponse.message, error: httpErrorResponse} as IGenericError;
        const actual = ErrorModule.createHttpClientSideGenericError(httpErrorResponse);

        expect(actual).toEqual(expected);
    });

    it('createHttpServerSideGenericError return minimized copy of HttpErrorResponse', () => {
        const expected = { errorCode: httpErrorResponse.status, errorMessage: httpErrorResponse.message, error: httpErrorResponse} as IGenericError;
        const actual = ErrorModule.createHttpServerSideGenericError(httpErrorResponse);

        expect(actual).toEqual(expected);
    });
});

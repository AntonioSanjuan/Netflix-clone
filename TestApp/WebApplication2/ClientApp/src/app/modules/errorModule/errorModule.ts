import { HttpErrorResponse } from '@angular/common/http';

import { IGenericError } from 'src/app/models/common/errors/genericError.model';

export abstract class ErrorModule {
    public static createHttpClientSideGenericError(error: HttpErrorResponse): IGenericError {
        const output = {
            errorCode: -1,
            errorMessage: error.message,
            error: {...error}

        } as IGenericError;
        return output;
    }

    public static createHttpServerSideGenericError(error: HttpErrorResponse): IGenericError {
        const output = {
            errorCode: error.status,
            errorMessage: error.message,
            error: {...error}

        } as IGenericError;
        return output;
    }
}

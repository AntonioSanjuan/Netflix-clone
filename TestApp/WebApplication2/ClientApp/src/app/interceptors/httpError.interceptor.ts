import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { IGenericError } from '../models/common/errors/genericError.model';
import { ErrorModule } from '../modules/errorModule/errorModule';

export class RequestInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let outputError: IGenericError;

                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        outputError = {...ErrorModule.createHttpClientSideGenericError(error)};
                    } else {
                        // server-side error
                        outputError = {...ErrorModule.createHttpServerSideGenericError(error)};
                    }
                    return throwError(outputError);
                })
            );
    }
}

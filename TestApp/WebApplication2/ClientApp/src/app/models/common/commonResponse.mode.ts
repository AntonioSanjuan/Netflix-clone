import { IResponseNotification } from './response/notification/notification.model';
import { IResponseSchema } from './response/schema/schema.model';

export interface ICommonResponse<T> {
    schema: IResponseSchema;
    content: T;
    notification: IResponseNotification;
}

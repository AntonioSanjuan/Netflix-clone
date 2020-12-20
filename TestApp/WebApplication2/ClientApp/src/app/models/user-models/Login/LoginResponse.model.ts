import { ICommonResponse } from '../../common/commonResponse.model';

export interface ILoginResponse extends ICommonResponse<ILoginResponseContent> {}

export interface ILoginResponseContent {
    isValid: boolean;
    accessToken: string;
}

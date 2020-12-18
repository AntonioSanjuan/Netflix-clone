import { ICommonResponse } from '../../common/commonResponse.mode';

export interface ILoginResponse extends ICommonResponse<ILoginResponseContent> {}

export interface ILoginResponseContent {
    isValid: boolean;
    accessToken: string;
}

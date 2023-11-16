import { ApiOptions } from './type';
import { HttpRequest } from '../http-request/index';
import ApiSDK from '../api-sdk/api-sdk';

const apiOptions: ApiOptions = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': ''
};

const createApiSDK = (apiOptions: ApiOptions): ApiSDK => {
    return new ApiSDK(new HttpRequest(apiOptions));
};

export const createOAuthApiClient = (token: string): ApiSDK => {
    const apiOptionsWithToken = { ...apiOptions, Authorization: `Bearer ${token}` };
    return createApiSDK(apiOptionsWithToken);
};

export const createApiKeyClient = (key: string): ApiSDK => {
    const apiOptionsWithKey = { ...apiOptions, Authorization: key };
    return createApiSDK(apiOptionsWithKey);
};


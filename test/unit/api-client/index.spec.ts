import { afterEach, jest, describe, test, expect } from '@jest/globals';
import { MOCK_HEADERS } from '../../mock/data.mock';
import { createApiKeyClient, createOAuthApiClient } from '../../../src/api-client/index';

import ApiSDK from '../../../src/api-sdk/api-sdk';
import { HttpRequest } from '../../../src/http-request';

jest.mock('../../../src/api-sdk/api-sdk');
jest.mock('../../../src/http-request/index');

describe('api-client module test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test(' create0AuthApiClient sets authorization with token passed in', () => {
        const token = 'some token';
        createOAuthApiClient(token);

        const oAuthHeaders = { ...MOCK_HEADERS, Authorization: `Bearer ${token}` };

        expect(HttpRequest).toHaveBeenCalledWith(oAuthHeaders);
        expect(ApiSDK).toHaveBeenCalledTimes(1);
    });
    test('creatApiKeyClient sets authorization key with key passed in', () => {
        const key = 'some key';
        createApiKeyClient(key);

        const apiKeyHeaders = { ...MOCK_HEADERS, Authorization: key };

        expect(HttpRequest).toHaveBeenCalledWith(apiKeyHeaders);
        expect(ApiSDK).toHaveBeenCalledTimes(1);
    });
});

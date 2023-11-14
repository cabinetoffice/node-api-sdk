import { jest, beforeEach, afterEach, describe, test, expect } from '@jest/globals';

import ApiSDK from '../../../src/api-sdk/api-sdk';
import { HttpRequest } from '../../../src/http-request';
import { MOCK_HEADERS } from '../../mock/data.mock';
import { Github } from '../../../src/api-sdk/github/github';

describe('api-sdk test suites', () => {
    let apiSdk: ApiSDK;

    beforeEach(() => {
        apiSdk = new ApiSDK(new HttpRequest(MOCK_HEADERS));
    });

    test('ApiSDK should have a gitHub property which is an instance of Github class', async () => {
        expect(apiSdk.gitHub).toBeInstanceOf(Github);
    });
});

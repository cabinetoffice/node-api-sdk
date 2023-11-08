import { jest, beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { HttpRequest } from '../../../src/http-request/index';
import { MOCK_HEADERS } from '../../mock/data.mock';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const createAxiosReponseObject = (customStatus?: number) => {
    return {
        status: customStatus || 200,
        data: 'some data',
        headers: MOCK_HEADERS
    };
};

describe('HttpRequest test suites', () => {
    let httpRequest: HttpRequest;

    beforeEach(() => {
        httpRequest = new HttpRequest(MOCK_HEADERS);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should return correct response properties upon making a successful GET request', async () => {
        const axiosGetResponse = createAxiosReponseObject();
        mockedAxios.mockResolvedValue(axiosGetResponse);

        const response = await httpRequest.httpGet('https://example.com/foo/posts');

        expect(response.status).toBe(200);
        expect(response.body).toBe('some data');
        expect(response.headers).toBe(MOCK_HEADERS);
    });

    test('Should return correct response properties upon making a successful POST request', async () => {
        const axiosPostResponse = createAxiosReponseObject(201);
        mockedAxios.mockResolvedValue(axiosPostResponse);

        const response = await httpRequest.httpPost('https://example.com/foo/posts');

        expect(response.status).toBe(201);
        expect(response.body).toBe('some data');
        expect(response.headers).toBe(MOCK_HEADERS);
    });

    test('Should return correct response properties upon making a successful PATCH request', async () => {
        const axiosPatchResponse = createAxiosReponseObject();
        mockedAxios.mockResolvedValue(axiosPatchResponse);

        const response = await httpRequest.httpPatch('https://example.com/foo/posts/1');

        expect(response.status).toBe(200);
        expect(response.body).toBe('some data');
        expect(response.headers).toBe(MOCK_HEADERS);
    });

    test('Should return correct response properties upon making a successful PUT request', async () => {
        const axiosPutResponse = createAxiosReponseObject();
        mockedAxios.mockResolvedValue(axiosPutResponse);

        const response = await httpRequest.httpPut('https://example.com/foo/posts/1');

        expect(response.status).toBe(200);
        expect(response.body).toBe('some data');
        expect(response.headers).toBe(MOCK_HEADERS);
    });

    test('Should return correct response properties upon making a successful DELETE request', async () => {
        const axiosDeleteResponse = createAxiosReponseObject();
        mockedAxios.mockResolvedValue(axiosDeleteResponse);

        const response = await httpRequest.httpDelete('https://example.com/foo/posts/1');

        expect(response.status).toBe(200);
        expect(response.body).toBe('some data');
        expect(response.headers).toBe(MOCK_HEADERS);
    });

    test('Should return default error status and error message if error object does not contain status, error message or error response data', async () => {
        mockedAxios.mockRejectedValue({});

        const errResponse = await httpRequest.httpGet('https://example.com/foo/posts');

        expect(errResponse.status).toBe(500);
        expect(errResponse.error).toEqual({ message: 'failed to execute http request' });
    });

    test('Should return error status from error object if present', async () => {
        mockedAxios.mockRejectedValue({ status: 504 });

        const errResponse = await httpRequest.httpGet('https://example.com/foo/posts');

        expect(errResponse.status).toBe(504);
    });

    test('Should return error response data from error object if present', async () => {
        const error = {
            response: {
                data: 'some data'
            }
        };
        mockedAxios.mockRejectedValue(error);

        const errResponse = await httpRequest.httpGet('https://example.com/foo/posts');

        expect(errResponse.error).toEqual(error.response.data);
    });

    test('Should return error message from error object if present', async () => {
        const error = {
            message: 'some message'
        };
        mockedAxios.mockRejectedValue(error);

        const errResponse = await httpRequest.httpGet('https://example.com/foo/posts');

        expect(errResponse.error).toEqual(error.message);
    });
});

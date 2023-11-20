import { jest, beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { Github } from '../../../../src/api-sdk/github/github';
import { HttpRequest } from '../../../../src/http-request/index';
import {
    MOCK_REPO_FETCH_RESPONSE,
    MOCK_MEMBER_FETCH_RESPONSE,
    MOCK_TEAM_FETCH_RESPONSE,
    MOCK_HEADERS,
    MOCK_REPO,
    MOCK_MEMBER,
    MOCK_TEAM,
    MOCK_ERROR_RESPONSE,
    MOCK_ERROR
} from '../../../mock/data.mock';
import { HttpResponse } from '../../../../src/http-request/type';

jest.mock('../../../../src/http-request/index', () => {
    return {
        HttpRequest: jest.fn().mockImplementation(() => ({
            httpGet: jest.fn()
        }))
    };
});

const createMockHttpResponse = (mockBody: any, status?: number, error?: any): HttpResponse => ({
    status: status || 200,
    body: mockBody,
    headers: MOCK_HEADERS,
    error: error || undefined
});

describe('Github sdk module test suites', () => {
    let github: Github;
    let httpRequestMock: any;

    beforeEach(() => {
        httpRequestMock = new HttpRequest(MOCK_HEADERS);
        github = new Github(httpRequestMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Should return repo data as an object', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_REPO));

        const url = 'https://api.github.com/users/test/repos';
        const result = await github.getRepos(url);
        expect(result).toEqual(MOCK_REPO_FETCH_RESPONSE);
    });

    test('Should return member data as an object', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_MEMBER));

        const url = 'https://api.github.com/org/test/members';
        const result = await github.getMembers(url);
        expect(result).toEqual(MOCK_MEMBER_FETCH_RESPONSE);
    });

    test('Should return team data as an object', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_TEAM));

        const url = 'https://api.github.com/users/test/teams';
        const result = await github.getTeams(url);
        expect(result).toEqual(MOCK_TEAM_FETCH_RESPONSE);
    });

    test('Should return an object with an error property', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_TEAM, 500, MOCK_ERROR));

        const url = 'https://api.github.com/users/test/repos';
        const result = await github.getTeams(url);
        expect(result).toEqual(MOCK_ERROR_RESPONSE);
    });

    test('Should ignore an unexpected entree in the object  ', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse({ ...MOCK_REPO, any: 'any' }));

        const url = 'https://api.github.com/users/test/repos';
        const result = await github.getRepos(url);

        expect(result).toEqual(MOCK_REPO_FETCH_RESPONSE);
    });
});

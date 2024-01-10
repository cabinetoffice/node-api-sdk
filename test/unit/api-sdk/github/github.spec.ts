import { jest, beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { Github } from '../../../../src/api-sdk/github/github';
import { HttpRequest } from '../../../../src/http-request/index';
import {
    MOCK_REPO_FETCH_RESPONSE,
    MOCK_MEMBER_FETCH_RESPONSE,
    MOCK_TEAM_FETCH_RESPONSE,
    MOCK_HEADERS,
    MOCK_REPOS,
    MOCK_MEMBERS,
    MOCK_TEAMS,
    MOCK_ERROR_RESPONSE,
    MOCK_ERROR,
    MOCK_UNMAPPED_ENTREE_REPO,
    MOCK_MEMBERS_PER_TEAM,
    MOCK_MEMBERS_PER_TEAM_RESPONSE,
    MOCK_REPOS_PER_TEAM,
    MOCK_REPOS_PER_TEAM_RESPONSE,
    MOCK_403_ERROR_MSG,
    MOCK_403_ERROR_RESPONSE
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
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_REPOS));

        const url = 'https://api.github.com/users/test/repos';
        const result = await github.getRepos(url);
        expect(result).toEqual(MOCK_REPO_FETCH_RESPONSE);
    });

    test('Should return member data as an object', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_MEMBERS));

        const url = 'https://api.github.com/org/test/members';
        const result = await github.getMembers(url);
        expect(result).toEqual(MOCK_MEMBER_FETCH_RESPONSE);
    });

    test('Should return team data as an object', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_TEAMS));

        const url = 'https://api.github.com/users/test/teams';
        const result = await github.getTeams(url);
        expect(result).toEqual(MOCK_TEAM_FETCH_RESPONSE);
    });

    test('Should return membersPerTeam data as an object', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_MEMBERS_PER_TEAM));

        const url = 'https://api.github.com/organizations/test_org_id/team/test_team_id/members';
        const result = await github.getMembersPerTeam(url);
        expect(result).toEqual(MOCK_MEMBERS_PER_TEAM_RESPONSE);
    });

    test('Should return reposPerTeam data as an object', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_REPOS_PER_TEAM));

        const url = 'https://api.github.com/organizations/test_org_id/teams/test_team_id/repos';
        const result = await github.getReposPerTeam(url);
        expect(result).toEqual(MOCK_REPOS_PER_TEAM_RESPONSE);
    });

    test('Should return an object with an error property', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_TEAMS, 500, MOCK_ERROR));

        const url = 'https://api.github.com/users/test/teams';
        const result = await github.getTeams(url);
        expect(result).toEqual(MOCK_ERROR_RESPONSE);
    });

    test('Should ignore an unexpected entree in the object  ', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_UNMAPPED_ENTREE_REPO));

        const url = 'https://api.github.com/users/test/repos';
        const result = await github.getRepos(url);

        expect(result).toEqual(MOCK_REPO_FETCH_RESPONSE);
    });

    test('Should return an object with an error property when status code is 403 with no error response', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_403_ERROR_MSG, 403));

        const url = 'https://api.github.com/users/test/repos';
        const result = await github.getRepos(url);
        expect(result).toEqual(MOCK_403_ERROR_RESPONSE);
    });
});

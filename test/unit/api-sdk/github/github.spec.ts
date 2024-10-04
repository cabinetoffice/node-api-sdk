import { jest, beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { Github } from '../../../../src/api-sdk/github/github';
import { HttpRequest } from '../../../../src/http-request/index';
import { MOCK_REPO_URL, MOCK_SHA, MOCK_BRANCH_NAME } from '../../../mock/text.mock';
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
    MOCK_UNMAPPED_RESPONSE_REPO,
    MOCK_MEMBERS_PER_TEAM,
    MOCK_MEMBERS_PER_TEAM_RESPONSE,
    MOCK_REPOS_PER_TEAM,
    MOCK_REPOS_PER_TEAM_RESPONSE,
    MOCK_403_ERROR_MSG,
    MOCK_403_ERROR_RESPONSE,
    MOCK_COLLABORATORS_PER_REPO,
    MOCK_COLLABORATORS_PER_REPO_RESPONSE,
    MOCK_FULL_RESPONSE_REPO,
    MOCK_FULL_RESPONSE_MEMBERS,
    MOCK_ISSUE_RESPONSE,
    MOCK_ISSUE_BODY,
    MOCK_GET,
    MOCK_GET_RESPONSE,
    MOCK_POST,
    MOCK_POST_RESPONSE,
    MOCK_SHA_RESPONSE,
    MOCK_POST_BRANCH,
    MOCK_POST_BLOB,
    MOCK_POST_TREE,
    MOCK_POST_COMMIT,
    MOCK_POST_PR,
    MOCK_PR_RESPONSE
} from '../../../mock/data.mock';
import { HttpResponse } from '../../../../src/http-request/type';

jest.mock('../../../../src/http-request/index', () => {
    return {
        HttpRequest: jest.fn().mockImplementation(() => ({
            httpGet: jest.fn(),
            httpPost: jest.fn()
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

    test('Should return full repo data as an object', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_FULL_RESPONSE_REPO));

        const url = 'https://api.github.com/org/test/repos';
        const result = await github.getGitHubInfo(url);
        expect(result).toEqual({
            ...MOCK_REPO_FETCH_RESPONSE,
            resource: MOCK_FULL_RESPONSE_REPO
        });
    });

    test('Should return full members data as an object', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_FULL_RESPONSE_MEMBERS));

        const url = 'https://api.github.com/org/test/members';
        const result = await github.getGitHubInfo(url);
        expect(result).toEqual({
            httpStatusCode: 200,
            resource: MOCK_FULL_RESPONSE_MEMBERS
        });
    });

    test('Should post an issue and return the object data', async () => {
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse(MOCK_ISSUE_RESPONSE));

        const url = 'https://api.github.com/repos/org1/repo1/issues';
        const result = await github.postIssue(url, MOCK_ISSUE_BODY);
        expect(result).toEqual({
            httpStatusCode: 200,
            resource: MOCK_ISSUE_RESPONSE
        });
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

    test('Should return collaborators per repo data as an object', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_COLLABORATORS_PER_REPO));

        const url = 'https://api.github.com/repos/organizations/repo/collaborators';
        const result = await github.getCollaboratorsPerRepo(url);
        expect(result).toEqual(MOCK_COLLABORATORS_PER_REPO_RESPONSE);
    });

    test('should return get data ', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_GET));

        const url = 'https://api.github.com/test/get';
        const result = await github.getData(url);

        expect(httpRequestMock.httpGet).toHaveBeenCalledWith(url);
        expect(result).toEqual(MOCK_GET_RESPONSE);
    });

    test('should post data successfully', async () => {
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse(MOCK_POST));

        const url = 'https://api.github.com/test/post';
        const body = { key: 'value' };

        const result = await github.postData(url, body);

        expect(httpRequestMock.httpPost).toHaveBeenCalledWith(url, JSON.stringify(body));
        expect(result).toEqual(MOCK_POST_RESPONSE);
    });

    test('Should retrieve the SHA of the main branch', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_SHA_RESPONSE));

        const result = await github.getSha(MOCK_REPO_URL);

        expect(httpRequestMock.httpGet).toHaveBeenCalledWith(`${MOCK_REPO_URL}/git/refs/heads/main`);
        expect(result).toEqual(MOCK_SHA);
    });

    test('Should create a new branch successfully', async () => {
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse({}));

        const result = await github.createBranch(MOCK_REPO_URL, MOCK_BRANCH_NAME, MOCK_SHA);
        expect(httpRequestMock.httpPost).toHaveBeenCalledWith(
            `${MOCK_REPO_URL}/git/refs`,
            JSON.stringify(MOCK_POST_BRANCH)
        );
        expect(result.httpStatusCode).toEqual(200);
    });

    test('should create a blob and return the SHA', async () => {
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse({ sha: MOCK_SHA }));

        const content = 'test content';
        const result = await github.createBlob(MOCK_REPO_URL, content);

        expect(httpRequestMock.httpPost).toHaveBeenCalledWith(`${MOCK_REPO_URL}/git/blobs`, JSON.stringify(MOCK_POST_BLOB));
        expect(result).toEqual(MOCK_SHA);
    });

    test('should create a tree and return the SHA', async () => {
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse({ sha: MOCK_SHA }));

        const path = 'terraform/account-1.tf';
        const blobSha = 'mockBlobSha';

        const result = await github.createTree(MOCK_REPO_URL, MOCK_SHA, path, blobSha);

        expect(httpRequestMock.httpPost).toHaveBeenCalledWith(`${MOCK_REPO_URL}/git/trees`, JSON.stringify(MOCK_POST_TREE));
        expect(result).toEqual(MOCK_SHA);
    });

    test('should create a commit and return the SHA', async () => {
        const commitSha = 'mockCommitSha';
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse({ sha: commitSha }));

        const message = 'commit message';
        const treeSha = 'mockTreeSha';

        const result = await github.createCommit(MOCK_REPO_URL, message, treeSha, MOCK_SHA);

        expect(httpRequestMock.httpPost).toHaveBeenCalledWith(`${MOCK_REPO_URL}/git/commits`, JSON.stringify(MOCK_POST_COMMIT));
        expect(result).toEqual(commitSha);
    });

    test('should update the branch reference with the commit SHA', async () => {
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse({}));

        const result = await github.updateBranchReferance(MOCK_REPO_URL, MOCK_BRANCH_NAME, MOCK_SHA);

        expect(httpRequestMock.httpPost).toHaveBeenCalledWith(`${MOCK_REPO_URL}/git/refs/heads/${MOCK_BRANCH_NAME}`, JSON.stringify({ sha: MOCK_SHA }));
        expect(result.httpStatusCode).toEqual(200);
    });
    test('should create a pull request and return the response', async () => {
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse(MOCK_PR_RESPONSE));

        const title = 'PR Title';
        const body = 'PR Body';
        const head = 'new-feature';
        const base = 'main';

        const result = await github.createPullRequest(MOCK_REPO_URL, title, body, head, base);

        expect(httpRequestMock.httpPost).toHaveBeenCalledWith(`${MOCK_REPO_URL}/pulls`, JSON.stringify(MOCK_POST_PR));
        expect(result).toEqual({
            httpStatusCode: 200,
            resource: MOCK_PR_RESPONSE
        });
    });

    test('should successfully post a pull request and return the response', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse({ object: { sha: MOCK_SHA } }));
        httpRequestMock.httpPost
            .mockResolvedValueOnce(createMockHttpResponse({})) // branch creation
            .mockResolvedValueOnce(createMockHttpResponse({ sha: 'mockBlobSha' }))
            .mockResolvedValueOnce(createMockHttpResponse({ sha: 'mockTreeSha' }))
            .mockResolvedValueOnce(createMockHttpResponse({ sha: 'mockCommitSha' }))
            .mockResolvedValueOnce(createMockHttpResponse({})) // branch update
            .mockResolvedValue(createMockHttpResponse(MOCK_PR_RESPONSE));

        const result = await github.postPullRequest(MOCK_REPO_URL, MOCK_PR_RESPONSE);

        expect(result).toEqual({
            httpStatusCode: 200,
            resource: MOCK_PR_RESPONSE
        });
    });

    test('Should return the error when SHA resource does not exist in getSha', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse({}, 404));

        const result = await github.getSha(MOCK_REPO_URL);

        expect(httpRequestMock.httpGet).toHaveBeenCalledWith(`${MOCK_REPO_URL}/git/refs/heads/main`);
        expect(result).toEqual({
            httpStatusCode: 404,
            errors: [{}],
        });
    });
    test('Should return the error when blob SHA resource does not exist in createBlob', async () => {
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse({}, 404));

        const content = 'test content';
        const result = await github.createBlob(MOCK_REPO_URL, content);

        expect(httpRequestMock.httpPost).toHaveBeenCalledWith(`${MOCK_REPO_URL}/git/blobs`, JSON.stringify(MOCK_POST_BLOB));
        expect(result).toEqual({
            httpStatusCode: 404,
            errors: [{}],
        });
    });

    test('Should return the error when tree SHA resource does not exist in createTree', async () => {
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse({}, 404));

        const path = 'terraform/account-1.tf';
        const blobSha = 'mockBlobSha';
        const result = await github.createTree(MOCK_REPO_URL, MOCK_SHA, path, blobSha);

        expect(httpRequestMock.httpPost).toHaveBeenCalledWith(`${MOCK_REPO_URL}/git/trees`, JSON.stringify(MOCK_POST_TREE));
        expect(result).toEqual({
            httpStatusCode: 404,
            errors: [{}],
        });
    });

    test('Should return the error when commit SHA resource does not exist in createCommit', async () => {
        httpRequestMock.httpPost.mockResolvedValue(createMockHttpResponse({}, 404));

        const message = 'commit message';
        const treeSha = 'mockTreeSha';
        const result = await github.createCommit(MOCK_REPO_URL, message, treeSha, MOCK_SHA);

        expect(httpRequestMock.httpPost).toHaveBeenCalledWith(`${MOCK_REPO_URL}/git/commits`, JSON.stringify(MOCK_POST_COMMIT));
        expect(result).toEqual({
            httpStatusCode: 404,
            errors: [{}],
        });
    });

    test('Should return an object with an error property', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_TEAMS, 500, MOCK_ERROR));

        const url = 'https://api.github.com/users/test/teams';
        const result = await github.getTeams(url);
        expect(result).toEqual(MOCK_ERROR_RESPONSE);
    });

    test('Should ignore an unexpected response fields in the object  ', async () => {
        httpRequestMock.httpGet.mockResolvedValue(createMockHttpResponse(MOCK_UNMAPPED_RESPONSE_REPO));

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

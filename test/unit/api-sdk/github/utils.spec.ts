import { jest, afterEach, describe, test, expect } from '@jest/globals';

import {
    extractBaseShaHelper,
    extractShaHelper,
    getShaParams,
    createBranchParams,
    createBlobParams,
    createTreeParams,
    createCommitParams,
    updateBranchReferenceParams,
    createPullRequestParams
} from '../../../../src/api-sdk/github/utils';
import { MOCK_REPO_URL, MOCK_BASE_SHA, MOCK_BLOB_SHA, MOCK_TREE_SHA, MOCK_COMMIT_SHA, MOCK_BRANCH_NAME, MOCK_PATH, MOCK_COMMIT_MESSAGE, MOCK_PR_TITLE, MOCK_PR_BODY } from '../../../mock/text.mock';
import { MOCK_POST_BLOB, MOCK_INVALID_SHA_RESPONSE, MOCK_POST_BRANCH, MOCK_POST_TREE, MOCK_POST_COMMIT, MOCK_POST_PR, MOCK_API_ERROR } from '../../../mock/data.mock';

describe('Github utils test suites', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('extractBaseShaHelper should return sha if it exists', () => {
        const mockBaseShaResponse = {
            httpStatusCode: 200,
            resource: { object: { sha: MOCK_BASE_SHA } }
        };
        const result = extractBaseShaHelper(mockBaseShaResponse);
        expect(result).toBe(MOCK_BASE_SHA);
    });

    test('extractBaseShaHelper should return response if resource does not exist', () => {
        jest.spyOn(global, 'Error').mockImplementationOnce(() => MOCK_API_ERROR);

        expect(() => extractBaseShaHelper(MOCK_INVALID_SHA_RESPONSE)).toThrowError(MOCK_API_ERROR);
    });

    test('extractShaHelper should return sha if it exists', () => {
        const mockShaResponse = {
            httpStatusCode: 200,
            resource: { sha: MOCK_BLOB_SHA }
        };
        const result = extractShaHelper(mockShaResponse);
        expect(result).toBe(MOCK_BLOB_SHA);
    });

    test('extractShaHelper should return response if sha does not exist', () => {
        jest.spyOn(global, 'Error').mockImplementationOnce(() => MOCK_API_ERROR);

        expect(() => extractShaHelper(MOCK_INVALID_SHA_RESPONSE)).toThrowError(MOCK_API_ERROR);
    });

    test('getShaParams should return the correct sha URL', () => {
        const result = getShaParams(MOCK_REPO_URL);
        expect(result).toBe(`${MOCK_REPO_URL}/git/refs/heads/main`);
    });

    test('createBranchParams should return the correct branch URL and body', () => {
        const { branchUrl, branchBody } = createBranchParams(MOCK_REPO_URL, MOCK_BRANCH_NAME, MOCK_BASE_SHA);

        expect(branchUrl).toBe(`${MOCK_REPO_URL}/git/refs`);
        expect(branchBody).toEqual(MOCK_POST_BRANCH);
    });

    test('createBlobParams should return the correct blob URL and body', () => {
        const { blobUrl, blobBody } = createBlobParams(MOCK_REPO_URL, 'test content');

        expect(blobUrl).toBe(`${MOCK_REPO_URL}/git/blobs`);
        expect(blobBody).toEqual(MOCK_POST_BLOB);
    });

    test('createTreeParams should return the correct tree URL and body', () => {
        const { treeUrl, treeBody } = createTreeParams(MOCK_REPO_URL, MOCK_BASE_SHA, MOCK_PATH, MOCK_BLOB_SHA);

        expect(treeUrl).toBe(`${MOCK_REPO_URL}/git/trees`);
        expect(treeBody).toEqual(MOCK_POST_TREE);
    });

    test('createCommitParams should return the correct commit URL and body', () => {
        const { commitUrl, commitBody } = createCommitParams(MOCK_REPO_URL, MOCK_COMMIT_MESSAGE, MOCK_TREE_SHA, MOCK_BASE_SHA);
        expect(commitUrl).toBe(`${MOCK_REPO_URL}/git/commits`);
        expect(commitBody).toEqual(MOCK_POST_COMMIT);
    });

    test('updateBranchReferenceParams should return the correct ref URL and body', () => {
        const { refUrl, refBody } = updateBranchReferenceParams(MOCK_REPO_URL, MOCK_BRANCH_NAME, MOCK_COMMIT_SHA);
        expect(refUrl).toBe(`${MOCK_REPO_URL}/git/refs/heads/${MOCK_BRANCH_NAME}`);
        expect(refBody).toEqual({ sha: MOCK_COMMIT_SHA });
    });

    test('createPullRequestParams should return the correct PR URL and body', () => {
        const { prUrl, prPostbody } = createPullRequestParams(MOCK_REPO_URL, MOCK_PR_TITLE, MOCK_PR_BODY, MOCK_BRANCH_NAME);
        expect(prUrl).toBe(`${MOCK_REPO_URL}/pulls`);
        expect(prPostbody).toEqual(MOCK_POST_PR);
    });
});

import { ApiResponse, ApiErrorResponse } from '../response';

export const extractBaseShaHelper = (response: ApiResponse<any> | ApiErrorResponse) => {
    if ('resource' in response && response.resource && 'object' in response.resource && 'sha' in response.resource.object) {
        return response.resource.object.sha;
    } else {
        return response;
    }
};

export const extractShaHelper = (response: ApiResponse<any> | ApiErrorResponse) => {
    if ('resource' in response && response.resource && 'sha' in response.resource) {
        return response.resource.sha;
    } else {
        return response;
    }
};

export const getShaParams = (repoUrl: string) => {
    const shaUrl = `${repoUrl}/git/refs/heads/main`;
    return shaUrl;
};

export const createBranchParams = (repoUrl: string, branchName: string, baseSha: string) => {
    const branchUrl = `${repoUrl}/git/refs`;
    const branchBody = {
        ref: `refs/heads/${branchName}`,
        sha: baseSha
    };
    return { branchUrl, branchBody };
};

export const createBlobParams = (repoUrl: string, content: string) => {
    const blobUrl = `${repoUrl}/git/blobs`;
    const blobBody = {
        content: Buffer.from(content).toString('base64'),
        encoding: 'base64'
    };
    return { blobUrl, blobBody };
};

export const createTreeParams = (repoUrl: string, baseTreeSha: string, path: string, blobSha: string) => {
    const treeUrl = `${repoUrl}/git/trees`;
    const treeBody = {
        base_tree: baseTreeSha,
        tree: [
            {
                path: path,
                mode: '100644',
                type: 'blob',
                sha: blobSha
            }
        ]
    };
    return { treeUrl, treeBody };
};

export const createCommitParams = (repoUrl: string, message: string, treeSha: string, parentSha: string) => {
    const commitUrl = `${repoUrl}/git/commits`;
    const commitBody = {
        message: message,
        tree: treeSha,
        parents: [parentSha]
    };
    return { commitUrl, commitBody };
};

export const updateBranchReferenceParams = (repoUrl: string, branch: string, commitSha: string) => {
    const refUrl = `${repoUrl}/git/refs/heads/${branch}`;
    const refBody = {
        sha: commitSha
    };
    return { refUrl, refBody };
};

export const createPullRequestParams = (repoUrl: string, prTitle: string, prBody: string, branchName: string, baseBranch: string) => {
    const prUrl = `${repoUrl}/pulls`;
    const prPostbody = {
        title: prTitle,
        body: prBody,
        head: branchName,
        base: baseBranch
    };
    return { prUrl, prPostbody };
};

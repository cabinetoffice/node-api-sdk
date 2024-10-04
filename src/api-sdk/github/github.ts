import {
    GitHubRepos,
    GitHubMembers,
    GitHubTeams,
    GitHubMembersPerTeam,
    GitHubReposPerTeam,
    GitHubCollaboratorsPerRepo,
    GitHubIssueRequest,
    GitHubPullRequest
} from './type';
import {
    reposMapping,
    membersMapping,
    teamsMapping,
    membersPerTeamMapping,
    reposPerTeamMapping,
    collaboratorsPerRepoMapping
} from './mapping';

import { ApiResponse, ApiErrorResponse } from '../response';
import { HttpRequest } from '../../http-request';

export class Github {

    constructor(private readonly request: HttpRequest) { /**/ }

    // Get info data. Could be repos/members/collaborator/teams ...
    public async getGitHubInfo(url: string): Promise<ApiResponse<any[]> | ApiErrorResponse> {
        const response = await this.request.httpGet(url);
        return this.responseHandler(response);
    }

    // Create Issue on defined repo
    public async postIssue (url: string, body: GitHubIssueRequest): Promise<ApiResponse<any> | ApiErrorResponse> {
        const response = await this.request.httpPost(url, JSON.stringify(body));
        return this.responseHandler(response);
    }

    // Github data Mapped for IDC project
    public async getRepos(url: string): Promise<ApiResponse<GitHubRepos[]> | ApiErrorResponse> {
        const response = await this.request.httpGet(url);
        return this.responseHandler<GitHubRepos[]>(response, reposMapping);
    }

    public async getMembers(url: string): Promise<ApiResponse<GitHubMembers[]> | ApiErrorResponse> {
        const response = await this.request.httpGet(url);
        return this.responseHandler<GitHubMembers[]>(response, membersMapping);
    }

    public async getTeams(url: string): Promise<ApiResponse<GitHubTeams[]> | ApiErrorResponse> {
        const response = await this.request.httpGet(url);
        return this.responseHandler<GitHubTeams[]>(response, teamsMapping);
    }

    public async getMembersPerTeam(url: string): Promise<ApiResponse<GitHubMembersPerTeam[]> | ApiErrorResponse> {
        const response = await this.request.httpGet(url);
        return this.responseHandler<GitHubMembersPerTeam[]>(response, membersPerTeamMapping);
    }

    public async getReposPerTeam(url: string): Promise<ApiResponse<GitHubReposPerTeam[]> | ApiErrorResponse> {
        const response = await this.request.httpGet(url);
        return this.responseHandler<GitHubReposPerTeam[]>(response, reposPerTeamMapping);
    }

    public async getCollaboratorsPerRepo(url: string): Promise<ApiResponse<GitHubCollaboratorsPerRepo[]> | ApiErrorResponse> {
        const response = await this.request.httpGet(url);
        return this.responseHandler<GitHubCollaboratorsPerRepo[]>(response, collaboratorsPerRepoMapping);
    }

    // generic get and post functions

    public async getData(url: string): Promise<ApiResponse<any> | ApiErrorResponse> {
        const response = await this.request.httpGet(url);
        return this.responseHandler<any>(response);
    }

    public async postData(url: string, body: any): Promise<ApiResponse<any> | ApiErrorResponse> {
        const response = await this.request.httpPost(url, JSON.stringify(body));
        return this.responseHandler<any>(response);
    }

    // create pr functionality using generic get and post functions

    public async getSha(repoUrl: string) {
        const url = `${repoUrl}/git/refs/heads/main`;
        const response = await this.getData(url);

        if ('resource' in response && response.resource) {
            return response.resource.object.sha;
        } else {
            return response;
        }
    }

    public async createBranch(repoUrl: string, branchName: string, baseSha: string) {
        const url = `${repoUrl}/git/refs`;
        const body = {
            ref: `refs/heads/${branchName}`,
            sha: baseSha
        };
        const response = await this.postData(url, body);
        return response;
    }

    public async createBlob(repoUrl: string, content: string) {
        const blobUrl = `${repoUrl}/git/blobs`;
        const body = {
            content: Buffer.from(content).toString('base64'),
            encoding: 'base64',
        };
        const response = await this.postData(blobUrl, body);

        if ('resource' in response && response.resource) {
            return response.resource.sha;
        } else {
            return response;
        }
    }

    public async createTree(repoUrl: string, baseTreeSha: string, path: string, blobSha: string) {
        const treeUrl = `${repoUrl}/git/trees`;
        const body = {
            base_tree: baseTreeSha,
            tree: [
                {
                    path: path,
                    mode: '100644',
                    type: 'blob',
                    sha: blobSha,
                }
            ]
        };
        const response = await this.postData(treeUrl, body);

        if ('resource' in response && response.resource) {
            return response.resource.sha;
        } else {
            return response;
        }
    }

    public async createCommit(repoUrl: string, message: string, treeSha: string, parentSha: string) {
        const commitUrl = `${repoUrl}/git/commits`;
        const body = {
            message: message,
            tree: treeSha,
            parents: [parentSha]
        };
        const response = await this.postData(commitUrl, body);

        if ('resource' in response && response.resource) {
            return response.resource.sha;
        } else {
            return response;
        }
    }

    public async updateBranchReferance(repoUrl: string, branch: string, commitSha: string) {
        const refUrl = `${repoUrl}/git/refs/heads/${branch}`;
        const body = {
            sha: commitSha,
        };
        const response = await this.postData(refUrl, body);
        return response;
    }

    public async createPullRequest(repoUrl: string, title: string, body: string, head: string, base: string): Promise<ApiResponse<any> | ApiErrorResponse> {
        const prUrl = `${repoUrl}/pulls`;
        const prBody = {
            title: title,
            body: body,
            head: head,
            base: base
        };
        const response = await this.postData(prUrl, prBody);
        return response;
    }

    public async postPullRequest (repoUrl: string, body: GitHubPullRequest): Promise<ApiResponse<any> | ApiErrorResponse> {
        const baseSha = await this.getSha(repoUrl);
        await this.createBranch(repoUrl, body.branchName, baseSha);
        const blobSha = await this.createBlob(repoUrl, body.prContent);
        const treeSha = await this.createTree(repoUrl, baseSha, body.filePath, blobSha);
        const commitSha = await this.createCommit(repoUrl, body.prTitle, treeSha, baseSha);

        await this.updateBranchReferance(repoUrl, body.branchName, commitSha);
        const response = this.createPullRequest(repoUrl, body.prTitle, body.prBody, body.branchName, body.baseBranch);
        return response;
    }

    private responseHandler<T>(
        response: any,
        responseMap?: (body: any) => T
    ): ApiResponse<T> | ApiErrorResponse {
        const resource: ApiResponse<T> & ApiErrorResponse = {
            httpStatusCode: response.status
        };

        if (response.error) {
            resource.errors = [response.error];
        } else if (response.status >= 400) {
            resource.errors = [response.body];
        } else {
            resource.resource = (responseMap) ? responseMap(response.body) : response.body;
        }

        return resource;
    }
}

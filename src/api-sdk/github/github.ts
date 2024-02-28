import {
    GitHubRepos,
    GitHubMembers,
    GitHubTeams,
    GitHubMembersPerTeam,
    GitHubReposPerTeam,
    GitHubCollaboratorsPerRepo,
    GitHubIssueRequest
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
        const response = await this.request.httpPost(url, body);
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

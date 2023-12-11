import { GitHubRepos, GitHubMembers, GitHubTeams, GithubMembersPerTeam } from './type';
import { ApiResponse, ApiErrorResponse } from '../response';
import { reposMapping, membersMapping, teamsMapping, membersPerTeamMapping } from './mapping';
import { HttpRequest } from '../../http-request';

export class Github {
    constructor(private readonly request: HttpRequest) {
        /**/
    }
    public async getRepos(url: string): Promise<ApiResponse<GitHubRepos[]> | ApiErrorResponse> {
        return await this.fetchData<GitHubRepos[]>(url, reposMapping);
    }

    public async getMembers(url: string): Promise<ApiResponse<GitHubMembers[]> | ApiErrorResponse> {
        return await this.fetchData<GitHubMembers[]>(url, membersMapping);
    }

    public async getTeams(url: string): Promise<ApiResponse<GitHubTeams[]> | ApiErrorResponse> {
        return await this.fetchData<GitHubTeams[]>(url, teamsMapping);
    }

    public async getMembersPerTeam(url: string): Promise<ApiResponse<GithubMembersPerTeam[]> | ApiErrorResponse> {
        return await this.fetchData<GithubMembersPerTeam[]>(url, membersPerTeamMapping);
    }

    private async fetchData<T>(
        url: string,
        mappingFunction: (body: any) => T
    ): Promise<ApiResponse<T> | ApiErrorResponse> {
        const response = await this.request.httpGet(url);
        const resource: ApiResponse<T> & ApiErrorResponse = {
            httpStatusCode: response.status
        };

        if (response.error) {
            resource.errors = [response.error];
        } else {
            resource.resource = mappingFunction(response.body);
        }

        return resource;
    }
}

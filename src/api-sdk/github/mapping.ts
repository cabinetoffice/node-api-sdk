import { GitHubMembers, GitHubRepos, GitHubTeams } from './type';

export const reposMapping = (body: any): GitHubRepos => {
    return {
        description: body.description,
        full_name: body.full_name,
        visibility: body.visibility,
        url: body.url,
        html_url: body.html_url,
        created_at: body.created_at,
        archived: body.archived
    };
};

export const membersMapping = (body: any): GitHubMembers => {
    return {
        login: body.login,
        url: body.url,
        html_url: body.html_url,
        repos_url: body.repos_url
    };
};

export const teamsMapping = (body: any): GitHubTeams => {
    return {
        name: body.name,
        description: body.description,
        url: body.url,
        html_url: body.html_url,
        repositories_url: body.repositories_url,
        members_url: body.members_url
    };
};

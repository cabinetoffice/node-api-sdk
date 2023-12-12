import { GitHubMembers, GitHubRepos, GitHubTeams, GitHubMembersPerTeam, GitHubReposPerTeam } from './type';

export const reposMapping = (body: any[]): GitHubRepos[] => {
    return body.map((obj) => ({
        description: obj.description,
        full_name: obj.full_name,
        visibility: obj.visibility,
        url: obj.url,
        html_url: obj.html_url,
        created_at: obj.created_at,
        archived: obj.archived
    }));
};

export const membersMapping = (body: any[]): GitHubMembers[] => {
    return body.map((obj) => ({
        login: obj.login,
        url: obj.url,
        html_url: obj.html_url,
        repos_url: obj.repos_url
    }));
};

export const teamsMapping = (body: any[]): GitHubTeams[] => {
    return body.map((obj) => ({
        name: obj.name,
        description: obj.description,
        url: obj.url,
        html_url: obj.html_url,
        repositories_url: obj.repositories_url,
        members_url: obj.members_url
    }));
};

export const membersPerTeamMapping = (body: any[]): GitHubMembersPerTeam[] => {
    return body.map((obj) => ({
        login: obj.login,
    }));
};

export const reposPerTeamMapping = (body: any[]): GitHubReposPerTeam[] => {
    return body.map((obj) => ({
        name: obj.name,
    }));
};

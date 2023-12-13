export interface GitHubRepos {
    name: string;
    description: string;
    full_name: string;
    visibility: string;
    url: string;
    html_url: string;
    created_at: string;
    archived: boolean;
}

export interface GitHubTeams {
    name: string;
    description: string;
    url: string;
    html_url: string;
    repositories_url: string;
    members_url: string;
}

export interface GitHubMembers {
    login: string;
    url: string;
    html_url: string;
    repos_url: string;
}

export interface GitHubMembersPerTeam {
    login: string;
}

export interface GitHubReposPerTeam {
    name: string;
}

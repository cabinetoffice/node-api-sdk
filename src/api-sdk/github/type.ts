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
}

export interface GitHubMembers {
    login: string;
    url: string;
    html_url: string;
}

export interface GitHubMembersPerTeam {
    login: string;
}

export interface GitHubReposPerTeam {
    name: string;
}

export interface GitHubCollaboratorsPerRepo {
    login: string;
    permissions: {
        pull: boolean;
        triage: boolean;
        push: boolean;
        maintain: boolean;
        admin: boolean;
    }
}

export interface GitHubIssueRequest {
    title: string,
    body: string,
    milestone: number,
    assignees: string[],
    labels: string[]
}

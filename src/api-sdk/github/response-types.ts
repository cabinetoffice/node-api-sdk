export interface ApiResponse<T> {
    httpStatusCode: number;
    resource?: T;
    headers?: any;
}

export interface ApiErrorResponse {
    httpStatusCode: number;
    errors?: ApiError[];
}

export interface ApiError {
    error?: string;
    errorValues?: Record<string, string>;
    location?: string;
    locationType?: string;
    type?: string;
}

export interface GitHubRepos {
    description: string;
    full_name: string;
    visibility: string;
    url: string;
    html_url: string;
    created_at: string;
    archived: boolean;
};

export interface GitHubTeams {
    name: string;
    description: string;
    url: string;
    html_url: string;
    repositories_url: string;
    members_url: string;
};

export interface GitHubMembers {
    login: string;
    url: string;
    html_url: string;
    repos_url: string;
};

import { ApiOptions } from '../../src/api-client/type';

export const MOCK_HEADERS: ApiOptions = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: ''
};

export const MOCK_REPOS = [
    {
        name: "repo1",
        archived: false,
        created_at: '2015-12-10T11:48:11Z',
        description: 'Best repo 1',
        full_name: 'org1/repo1',
        html_url: 'https://github.com/org1/repo1',
        url: 'https://api.github.com/org1/repo1',
        visibility: 'public'
    },
    {
        name: "repo2",
        archived: false,
        created_at: '2018-12-10T11:48:11Z',
        description: 'Best repo 2',
        full_name: 'org1/repo2',
        html_url: 'https://github.com/org1/repo2',
        url: 'https://api.github.com/org1/repo2',
        visibility: 'public'
    }
];

export const MOCK_UNMAPPED_ENTREE_REPO = [
    {
        name: "repo1",
        archived: false,
        created_at: '2015-12-10T11:48:11Z',
        description: 'Best repo 1',
        full_name: 'org1/repo1',
        html_url: 'https://github.com/org1/repo1',
        url: 'https://api.github.com/org1/repo1',
        visibility: 'public',
        test: 'test'
    },
    {
        name: "repo2",
        archived: false,
        created_at: '2018-12-10T11:48:11Z',
        description: 'Best repo 2',
        full_name: 'org1/repo2',
        html_url: 'https://github.com/org1/repo2',
        url: 'https://api.github.com/org1/repo2',
        visibility: 'public',
        any: 'any'
    }
];

export const MOCK_REPO_FETCH_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_REPOS
};

export const MOCK_MEMBERS = [
    {
        login: 'user1',
        url: 'https://api.github.com/users/user1',
        html_url: 'https://github.com/user1',
        repos_url: 'https://api.github.com/users/user1/repos'
    },
    {
        login: 'user2',
        url: 'https://api.github.com/users/user2',
        html_url: 'https://github.com/user2',
        repos_url: 'https://api.github.com/users/user2/repos'
    }
];

export const MOCK_MEMBER_FETCH_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_MEMBERS.map(({ repos_url, ...rest }) => rest)
};

export const MOCK_TEAMS = [
    {
        name: 'team1',
        description: 'Test team 1',
        url: 'https://api.github.com/organizations/test/team1',
        html_url: 'https://github.com/orgs/alphagov/teams/team1',
        repositories_url: 'https://api.github.com/organizations/test/team1/repos',
        members_url: 'https://api.github.com/organizations/test/team1/members'
    },
    {
        name: 'team2',
        description: 'Test team 2',
        url: 'https://api.github.com/organizations/test/team2',
        html_url: 'https://github.com/orgs/alphagov/teams/team2',
        repositories_url: 'https://api.github.com/organizations/test/team2/repos',
        members_url: 'https://api.github.com/organizations/test/team2/members'
    }
];

export const MOCK_TEAM_FETCH_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_TEAMS.map(({ members_url, repositories_url, ...rest }) => rest)
};

export const MOCK_MEMBERS_PER_TEAM = [
    {
        login: 'member1',
    },
    {
        login: 'member2',
    }
];

export const MOCK_MEMBERS_PER_TEAM_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_MEMBERS_PER_TEAM
};

export const MOCK_REPOS_PER_TEAM = [
    {
        name: 'repo1',
    },
    {
        name: 'repo2',
    }
];

export const MOCK_REPOS_PER_TEAM_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_REPOS_PER_TEAM
};

export const MOCK_ERROR = {
    error: 'Error: test error'
};

export const MOCK_ERROR_RESPONSE = {
    httpStatusCode: 500,
    errors: [MOCK_ERROR]
};

export const MOCK_403_ERROR_MSG = { "message": "Must have admin rights to Repository." };

export const MOCK_403_ERROR_RESPONSE = {
    httpStatusCode: 403,
    errors: [MOCK_403_ERROR_MSG]
};

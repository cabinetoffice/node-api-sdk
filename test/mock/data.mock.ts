import { ApiOptions } from '../../src/api-client/type';

export const MOCK_HEADERS: ApiOptions = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: ''
};

export const MOCK_REPO = {
    archived: false,
    created_at: '2015-12-10T11:48:11Z',
    description: 'Best repo1',
    full_name: 'org1/repo1',
    html_url: 'https://github.com/org1/repo1',
    url: 'https://api.github.com/org1/repo1',
    visibility: 'public'
};

export const MOCK_REPO_FETCH_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_REPO
};

export const MOCK_MEMBER = {
    login: 'user1',
    url: 'https://api.github.com/users/user1',
    html_url: 'https://github.com/user1',
    repos_url: 'https://api.github.com/users/user1/repos'
};

export const MOCK_MEMBER_FETCH_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_MEMBER
};

export const MOCK_TEAM = {
    name: 'team1',
    description: 'Test team',
    url: 'https://api.github.com/organizations/test/team1',
    html_url: 'https://github.com/orgs/alphagov/teams/team1',
    repositories_url: 'https://api.github.com/organizations/test/team1/repos',
    members_url: 'https://api.github.com/organizations/test/team1/members'
};

export const MOCK_TEAM_FETCH_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_TEAM
};

export const MOCK_ERROR = {
    error: 'Error: test error'
};

export const MOCK_ERROR_RESPONSE = {
    httpStatusCode: 500,
    errors: [MOCK_ERROR]
};

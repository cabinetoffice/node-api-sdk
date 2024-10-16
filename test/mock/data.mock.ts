import { ApiOptions } from '../../src/api-client/type';

export const MOCK_HEADERS: ApiOptions = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: ''
};

export const MOCK_REPOS = [
    {
        name: 'repo1',
        archived: false,
        created_at: '2015-12-10T11:48:11Z',
        description: 'Best repo 1',
        full_name: 'org1/repo1',
        html_url: 'https://github.com/org1/repo1',
        url: 'https://api.github.com/org1/repo1',
        visibility: 'public'
    },
    {
        name: 'repo2',
        archived: false,
        created_at: '2018-12-10T11:48:11Z',
        description: 'Best repo 2',
        full_name: 'org1/repo2',
        html_url: 'https://github.com/org1/repo2',
        url: 'https://api.github.com/org1/repo2',
        visibility: 'public'
    }
];

export const MOCK_UNMAPPED_RESPONSE_REPO = [
    {
        name: 'repo1',
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
        name: 'repo2',
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

export const MOCK_FULL_RESPONSE_REPO = [ ...MOCK_UNMAPPED_RESPONSE_REPO ];

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

export const MOCK_FULL_RESPONSE_MEMBERS = [ ...MOCK_MEMBERS ];

export const MOCK_MEMBER_FETCH_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_MEMBERS.map(({ repos_url: _repos_url, ...rest }) => rest)
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
    resource: MOCK_TEAMS.map(({ members_url: _members_url, repositories_url: _repositories_url, ...rest }) => rest)
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

export const MOCK_COLLABORATORS_PER_REPO = [
    {
        other: 'other',
        login: 'name',
        permissions: { pull: true, triage: true, push: true, maintain: true, admin: true }
    },
    {
        other: 'other2',
        login: 'name2',
        permissions: { pull: true, triage: false, push: false, maintain: false, admin: false }
    },
];

export const MOCK_COLLABORATORS_PER_REPO_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_COLLABORATORS_PER_REPO.map(({ other: _other, ...rest }) => rest)
};

export const MOCK_ISSUE_BODY = {
    title: 'Add member to the team',
    body: 'Add member Bob to the team Alice.',
    assignees: ['IDC TEAM'],
    labels: ['GIT']
};

export const MOCK_ISSUE_RESPONSE = {
    id: 1,
    number: 1347,
    state: 'open',
    title: 'Add member to the team',
    body: 'Add member Bob to the team Alice.'
};

export const MOCK_ERROR = {
    error: 'Error: test error'
};

export const MOCK_ERROR_RESPONSE = {
    httpStatusCode: 500,
    errors: [MOCK_ERROR]
};

export const MOCK_403_ERROR_MSG = { 'message': 'Must have admin rights to Repository.' };

export const MOCK_403_ERROR_RESPONSE = {
    httpStatusCode: 403,
    errors: [MOCK_403_ERROR_MSG]
};

export const MOCK_GET = { data: 'test data' };

export const MOCK_GET_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_GET
};

export const MOCK_POST = { success: true };

export const MOCK_POST_RESPONSE = {
    httpStatusCode: 200,
    resource: MOCK_POST
};

export const MOCK_SHA_RESPONSE = {
    object: { sha: 'ABC12345678' }
};

export const MOCK_INVALID_SHA_RESPONSE = {
    httpStatusCode: 404,
    object: ['Resource not found']
};

export const MOCK_API_ERROR = new Error(`Error: ${JSON.stringify(MOCK_INVALID_SHA_RESPONSE)}`);

export const MOCK_POST_BRANCH = { ref: 'refs/heads/test-branch', sha: 'ABC12345678' };

export const MOCK_POST_BLOB = {
    content: Buffer.from('test content').toString('base64'),
    encoding: 'base64'
};

export const MOCK_POST_TREE = {
    base_tree: 'ABC12345678',
    tree: [{ path: 'terraform/account-1.tf', mode: '100644', type: 'blob', sha: 'ABC12345678' }]
};

export const MOCK_POST_COMMIT = {
    message: 'commit message',
    tree: 'ABC12345678',
    parents: ['ABC12345678']
};

export const MOCK_POST_PR = {
    title: 'PR Title',
    body: 'PR Body',
    head: 'test-branch',
    base: 'main'
};

export const MOCK_PR_RESPONSE = {
    branchName: 'new-feature',
    prContent: 'some content',
    filePath: 'file.txt',
    prTitle: 'PR Title',
    prBody: 'PR Body',
    baseBranch: 'main'
};

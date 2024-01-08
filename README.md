# Node API SDK

![npm](https://img.shields.io/npm/v/%40co-digital%2Fapi-sdk)
![Static Badge](https://img.shields.io/badge/test_coverage-%E2%89%A595%25-green)

This Node.js SDK module is a development tool that simplifies and accelerates the integration of external services or APIs into Node.js applications. It aims to make the developer's life easier by providing a well-documented, customizable, and reliable interface to interact with the external service.
Allows developers to extend the SDK's behavior through configuration options and callbacks and implements security best practices that protect against common vulnerabilities and threats, especially if handling sensitive data or credentials.

## Files Structure

| Directory Path       | Description                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `./api-client/`      | This directory is used to create api client object based on Authentication headers (OAuth or api Key).                                                                                                                                                                                                                                                                                 |
| `./api-sdk/`         | This directory is where the department related SDK modules are keept.                                                                                                                                                                                                                                                                                                                  |
| `./api-sdk/github`   | This folder is the entry point for the GitHub API SDK calls, data types and includes TypeScript interfaces that describe the structure and shape of various objects used in the module and possible mapping.                                                                                                                                                                           |
| `./api-sdk/identity` | This folder is the entry point for the Identity API SDK calls, data types and mapping.                                                                                                                                                                                                                                                                                                 |
| `./http-request/`    | This folder contains the core class of this module, the `HttpRequest` class. It serves as the foundation for creating an `Axios` object with a predefined sequence of `AxiosRequestConfig` configurations before initiating the actual HTTP request. This object will then be provided as a parameter to the ApiSDK and passed to all SDKs for executing the corresponding HTTP calls. |
| `./index.ts`         | This file will export all related and important function of this module, mainly `createOAuthApiClient` and `createApiKeyClient`.                                                                                                                                                                                                                                                       |
| Others files         | Other files related to modules dependency, CI/CD, \*git, dockerization, lint, test/typescript configs …                                                                                                                                                                                                                                                                                |

## Api Client module

This directory is responsible for creating API client objects that interact with external services, APIs, or systems. These clients are typically configured with the necessary authentication headers, such as OAuth tokens or API keys.

```js
const apiOptions: ApiOptions = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "",
};

const createApiSDK = (apiOptions: ApiOptions): ApiSDK => {
  return new ApiSDK(new HttpRequest(apiOptions));
};

export const createOAuthApiClient = (token: string): ApiSDK => {
  apiOptions.Authorization = `Bearer ${token}`;
  return createApiSDK(apiOptions);
};

export const createApiKeyClient = (key: string): ApiSDK => {
  apiOptions.Authorization = key;
  return createApiSDK(apiOptions);
};
```

## Api SDKs

The project is organized for working with multiple APIs using SDKs, with a clear separation of concerns. Each directory serves a specific purpose, making the codebase more maintainable and readable.
It serves as the home for SDK modules that provide a higher-level, user-friendly interface for developers to interact with APIs. SDKs abstract away the intricacies of API calls, making it easier for developers to work with the external service. Each SDK module typically includes methods for API calls, data types, and TypeScript interfaces that describe the shape of data objects used in the module.

```js
import { HttpRequest } from "../http-request";

import { Identity } from "./identity";
import { Github } from "./github";

export default class ApiSDK {
    public readonly identity: Identity;
    public readonly gitHub: Github;

    constructor (readonly request: HttpRequest) {
        this.identity = new Identity(request);
        this.gitHub = new Github(request);
    }
}
```

The first API calls implemented is specifically dedicated to the GitHub API SDK and soon after is going to include the Identity API SDK calls

```js
export const makeUserInfoRequest = () => ();
export const makeTokenRequest = () => ();
// export const make... = () => ();
export const buildAuthorizeRequest = () => ();
export const buildSecureAuthorizeRequest = () => ();
export const buildLogoutUrl = () => ();
// export const build... = () => ();
export const validateIdToken = () => ();
export const validateLogoutToken = () => ();
// export const validate... = () => ();
```

## HTTP Request class

The `http-request` directory contains core functionality for handling HTTP requests in your module. The key component is the `HttpRequest` class, which serves as the foundation for creating Axios objects configured with specific settings.

```js

export class HttpRequest {

    constructor(private readonly headers: ApiOptions) { /**/ }
    public async httpGet(url: string, headers?: Headers): Promise<HttpResponse> {
        return await this.request({ method: "GET", url, headers });
    }
    public async httpPost(url: string, body?: any, headers?: Headers): Promise<HttpResponse> { /*...*/ }
    public async httpPatch(url: string, body?: any, headers?: Headers): Promise<HttpResponse> { /*...*/ }
    public async httpPut(url: string, body?: any, headers?: Headers): Promise<HttpResponse> { /*...*/ }
    public async httpDelete(url: string): Promise<HttpResponse> { /*...*/ }

    private async request(additionalOptions: AdditionalOptions): Promise<HttpResponse> {
        try {
            const options: AxiosRequestConfig = {
                // `headers` are custom headers to be sent, contains "Content-Type", "Accept"
                // "Authorization" and additional headers from response object
                headers: {
                    ...this.headers,
                    ...additionalOptions.headers
                },

                // `method` is the request method to be used when making the request
                // Only applicable for request methods 'GET', 'PUT', 'POST', 'PATCH' and 'DELETE'
                method: additionalOptions.method,

                // `url` is the server URL that will be used for the request including `params`
                url: additionalOptions.url,

                // `responseType` indicates the type of data that the server will respond with
                // options are: 'arraybuffer', 'document', 'json', 'text', 'stream', browser only: 'blob'
                responseType: 'json',

                // `validateStatus` defines whether to resolve or reject the promise for a given
                // HTTP response status code (only if the status code is less than 500 in our context).
                // If `validateStatus` returns `true` (or is set to `null` or `undefined`),
                // the promise will be resolved; otherwise, the promise will be rejected.
                validateStatus: (status: number) => status < 500
            };

            if (additionalOptions.body) {
                // `data` is the data to be sent as the request body
                // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
                options.data = additionalOptions.body;
            }

            const resp = await axios(options);

            return {
                status: resp.status,
                body: resp.data,
                headers: resp.headers
            };
        } catch (e: any) {
            const errorMessage = { message: "failed to execute http request" };
            return {
                status: e?.status || 500,
                error: e?.response?.data || e?.message || errorMessage
            };
        }
    }
}

```

The HttpRequest class is responsible for configuring Axios `request` with predefined AxiosRequestConfig settings, such as authentication headers and other request-related parameters. This Axios object is then used for making HTTP requests within your SDKs.

```js
import { HttpRequest } from "../../http-request";
import { ApiResponse, ApiErrorResponse } from "../response";

export class Github {
    constructor(private readonly request: HttpRequest) {
        /**/
    }
    public async getRepos(url: string): Promise<ApiResponse<GitHubRepos> | ApiErrorResponse> {
        return this.fetchData<GitHubRepos>(url, reposMapping);
    }

    public async getMembers(url: string): Promise<ApiResponse<GitHubMembers> | ApiErrorResponse> {
        return this.fetchData<GitHubMembers>(url, membersMapping);
    }

    public async getTeams(url: string): Promise<ApiResponse<GitHubTeams> | ApiErrorResponse> {
        return this.fetchData<GitHubTeams>(url, teamsMapping);
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
```

## Integration

```js
import { createOAuthApiClient } from "@co-digital/api-sdk";
...
const apiClient = createOAuthApiClient(token);
const teams = await apiClient.gitHub.getTeams(url);
...
```

## Contributing

```sh
## Set Node/NPM env
nvm use

## Installing & Building
make build

## Testing & Coverage
make test
#or
make coverage
```

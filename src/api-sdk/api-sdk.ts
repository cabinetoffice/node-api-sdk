import { HttpRequest } from '../http-request';

import { Github } from './github/github';

export default class ApiSDK {
    public readonly gitHub: Github;

    constructor(readonly request: HttpRequest) {
        this.gitHub = new Github(request);
    }
}

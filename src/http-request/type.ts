export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Headers {
    [key: string]: any;
}

export interface HttpResponse {
    error?: any;
    status: number;
    body?: any;
    headers?: Headers;
}

export interface AdditionalOptions {
    method: RequestMethod;
    headers?: Headers;
    url: string;
    body?: any;
}

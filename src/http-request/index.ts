import { ApiOptions } from 'api-client/type';
import { AdditionalOptions, HttpResponse } from './type';
import axios, { AxiosRequestConfig } from 'axios';

export class HttpRequest {
    constructor(private readonly headers: ApiOptions) {
        /**/
    }
    public async httpGet(url: string, headers?: Headers): Promise<HttpResponse> {
        return await this.request({ method: 'GET', url, headers });
    }
    public async httpPost(url: string, body?: any, headers?: Headers): Promise<HttpResponse> {
        return await this.request({ method: 'POST', url, body, headers });
    }
    public async httpPatch(url: string, body?: any, headers?: Headers): Promise<HttpResponse> {
        return await this.request({ method: 'PATCH', url, body, headers });
    }
    public async httpPut(url: string, body?: any, headers?: Headers): Promise<HttpResponse> {
        return await this.request({ method: 'PUT', url, body, headers });
    }
    public async httpDelete(url: string): Promise<HttpResponse> {
        return await this.request({ method: 'DELETE', url });
    }

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
            const errorMessage = { message: 'failed to execute http request' };
            return {
                status: e?.status || 500,
                error: e?.response?.data || e?.message || errorMessage
            };
        }
    }
}

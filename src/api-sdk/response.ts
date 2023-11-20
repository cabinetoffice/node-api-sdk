export interface ApiResponse<T> {
    httpStatusCode: number;
    resource?: T;
    headers?: Record<string, any>;
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

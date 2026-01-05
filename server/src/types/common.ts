interface ServiceResponseData {
    [key: string]: unknown;
    ok: boolean;
    message: string;
}

export interface ServiceResponse {
    [key: string]: unknown;
    status: number;
    data: ServiceResponseData;
}
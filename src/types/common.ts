interface ServiceResponseData {
    [key: string]: unknown;
    ok: boolean;
    message: string;
}

export interface ServiceResponse {
    status: number;
    data: ServiceResponseData;
}
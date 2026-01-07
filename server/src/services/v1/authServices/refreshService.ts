import type {AuthPayload, ServiceResponse} from "@src/types/index.js";

export async function refreshService(
    userPayload: AuthPayload,
    oldToken: string,
): Promise<ServiceResponse> {

}
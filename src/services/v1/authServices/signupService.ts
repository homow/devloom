import type {InputUser} from "@validators/user.js";
import type {ServiceResponse} from "@src/types/index.js";

export async function signupService(
    body: InputUser
): Promise<ServiceResponse> {
    void body;
    return {
        status: 200,
        data: {
            ok: true,
            message: "Sign up successfully",
            body
        }
    };
}
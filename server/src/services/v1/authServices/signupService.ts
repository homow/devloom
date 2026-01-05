import {
    checkBannedUser,
    checkUserDB,
    getSafeUser,
    hashSecret
} from "@src/lib/index.js";
import {UserModel} from "@models/User.model.js";
import type {InputUser} from "@validators/user.js";
import {type ServiceResponse, UserRole} from "@src/types/index.js";

export async function signupService(
    body: InputUser
): Promise<ServiceResponse> {
    const {email, password, name} = body;

    const userBanned = await checkBannedUser(
        email
    );
    if (userBanned) return userBanned;

    // check if user exist
    const userExist = await checkUserDB(
        {email}
    );

    if (userExist) {
        return {
            status: 409,
            data: {
                ok: false,
                message: "email already exist",
            }
        };
    }

    // hashed password
    const hashedPassword: string = await hashSecret(password);

    // check user count for create admin
    const countUser: number = await UserModel.countDocuments();

    const newUser = await UserModel
        .create({
            name,
            email,
            password: hashedPassword,
            role: countUser === 0 ? UserRole.ADMIN : UserRole.USER,
        });

    return {
        status: 201,
        data: {
            ok: true,
            message: "Sign up successfully",
            user: getSafeUser(newUser),
        }
    };
}